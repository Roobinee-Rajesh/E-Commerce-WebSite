// Products in admin page
const loadAdminIndex = () => {
    const adminIndexProductsRef = document.getElementById("adminIndexProducts");
    const products = JSON.parse(localStorage.getItem("products"));
  
    let body = "";
    for (let product of products) {
      body += `<tr>
      <td><img src="${
        product.thumbnail
      }" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
      <td>${product.title}</td>
      <td>${product.description}...</td>
      <td style="width:100px;"> ₹ ${product.price}</td>
      <td class="d-flex justify-content-center">
        <button class="btn btn-primary me-2" onClick="editProduct(${product.id})">Edit</button>
        <button class="btn btn-danger" onClick="deleteProduct(${
          product.id
        })">Delete</button>
      </td>
    </tr>`;
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

