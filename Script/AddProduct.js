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
  let products = JSON.parse(localStorage.getItem("products"));
let id = idRef.value;
if (id) {
  console.log(id);
  const product = products.find((product) => product.id === parseInt(id));

  products = products.filter((product) => product.id !== parseInt(id));
  products.push({
    ...product,
    title: productNameRef.value,
    description: descriptionRef.value,
    price: priceRef.value,
    thumbnail: imageRef.value,
  });

  toastMessageRef.innerText = "Product updated successfully!!!";
  toastRef.classList.add("fade", "show");

      setTimeout(() => {
        toastRef.classList.remove("fade", "show");
      }, 2000);
  localStorage.setItem("products", JSON.stringify(products));
      location.href = "/Admin/index.html";
}
else{
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
      toastMessageRef.innerText = "Product added successfully!!!";
      toastRef.classList.add("fade", "show");

      setTimeout(() => {
        toastRef.classList.remove("fade", "show");
      }, 2000);
      localStorage.setItem("products", JSON.stringify(products));
      location.href = "/Admin/AddProduct.html";
    } else {
      errorRef.innerText = "Fields are empty";
    }
}
};


