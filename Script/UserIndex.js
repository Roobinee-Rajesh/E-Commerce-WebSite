// User Index

const loadUserIndex = () => {
    const indexProductsRef = document.getElementById("indexProducts");
    const products = JSON.parse(localStorage.getItem("products"));
  
    let body = "";
    for (let product of products) {
      body += `<div class="col-4 mt-4">
      <div
      style="background-color:white"
        class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column mh-75"
      >
        <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
        <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
        <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
        <button class="btn btn-success" onClick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>`;
    }
    indexProductsRef.innerHTML = body;
  };