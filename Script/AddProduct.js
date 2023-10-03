//Admin Add Products
const addProduct = () => {
    event.preventDefault();
    console.log("clicked");
    const idRef = document.getElementById("id");
    const productNameRef = document.getElementById("productName");
    const priceRef = document.getElementById("price");
    const descriptionRef = document.getElementById("description");
    const imageRef = document.getElementById("image");
    const errorRef=document.getElementById("error");
    const products = JSON.parse(localStorage.getItem("products"));
   
  if(productNameRef.value.length>0 && priceRef.value.length>0 && descriptionRef.value.length>0 && imageRef.value.length>0)
  {
      products.push({
        id: getRandomId("products"),
        title: productNameRef.value,
        description: descriptionRef.value,
        price: priceRef.value,
        thumbnail: imageRef.value,
      });
      localStorage.setItem("products", JSON.stringify(products));
      alert("Product has been added successfully");
    location.href = "/Admin/AddProduct.html";
    }
  else{
    errorRef.innerText="Fields are empty"
  }
  };