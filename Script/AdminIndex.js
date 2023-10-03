// Products in admin page
const loadAdminIndex = () => {
    const adminIndexProductsRef = document.getElementById("adminIndexProducts");
    const products = JSON.parse(localStorage.getItem("products"));
  
    let body = "";
    for (let product of products) {

    body+=
      `<div class="col-4 mt-4">
      <div
        class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column mh-75"
      >
        <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
        <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
        <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
        <div class="d-flex justify-content-center">
        <button class="btn btn-primary me-2" onClick="editProduct(${product.id})">Edit</button>
        <button class="btn btn-danger" onClick="deleteProduct(${
          product.id
        })">Delete</button>
      </div>
      </div>
    </div>`;
    }
    
    adminIndexProductsRef.innerHTML = body;
  };

  // Admin Delete Product
const deleteProduct = (id) => {
    const products = JSON.parse(localStorage.getItem("products"));
    const filteredProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    loadAdminIndex();
  };

  // edit product - admin page
const editProduct = (id) => {
  location.href = `/Admin/AddProduct.html?id=${id}`;
};

