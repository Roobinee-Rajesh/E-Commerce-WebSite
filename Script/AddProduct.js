// Admin Add Products
const addProduct = () => {
  event.preventDefault();
  console.log("clicked");
  const idRef = document.getElementById("id");
  const productNameRef = document.getElementById("productName");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("description");
  const imageRef = document.getElementById("image");
  const errorRef = document.getElementById("error");
  const toastRef = document.getElementById("toast");
  const toastMessageRef = document.getElementById("toastMessage");
  const toastBtnRef = document.getElementById("toastBtnRef");
  let products = JSON.parse(localStorage.getItem("products"));

  if (id) {
    const productIndex = products.findIndex(
      (index) => parseInt(index.id) === parseInt(idRef.value)
    );
   
    products[productIndex] = {
      id: idRef.value,
      title: productNameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    };
   
    localStorage.setItem("products", JSON.stringify(products));
    toastMessageRef.innerText = "Product updated successfully!!!";
    toastRef.classList.add("fade", "show");

    setTimeout(() => {
      toastRef.classList.remove("fade", "show");
      location.href = "/E-Commerce-WebSite/Admin/index.html";
    }, 2000);
  } else {
    if (
      productNameRef.value.length > 0 &&
      priceRef.value.length > 0 &&
      descriptionRef.value.length > 0 &&
      imageRef.value.length > 0
    ) {
      products.push({
        id: getRandomId("products"),
        title: productNameRef.value,
        description: descriptionRef.value,
        price: priceRef.value,
        thumbnail: imageRef.value,
      });
      localStorage.setItem("products", JSON.stringify(products));
      toastMessageRef.innerText = "Product added successfully!!!";
      toastRef.classList.add("fade", "show");

      setTimeout(() => {
        location.href = "/E-Commerce-WebSite/Admin/AddProduct.html";
        toastRef.classList.remove("fade", "show");
      }, 2000);
    } else {
      errorRef.innerText = "Fields are empty";
    }
  }
};
