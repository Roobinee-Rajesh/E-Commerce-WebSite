//Array od products
let initialProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },
  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
  },
];

//Array of users
let validUsers = [
  { id: 1, email: "admin@gmail.com", password: "admin@123" },
  { id: 2, email: "user@gmail.com", password: "user@123" },
];

window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(validUsers));
  }
  if (location.pathname === "/Admin/index.html") {
    loadAdminIndex();
  }

  if (location.pathname === "/Admin/orders.html") {
    loadAdminOrders();
  }

  if (location.pathname === "/Admin/AddProduct.html") {
    let params = new URL(document.location).searchParams;
    let productId = params.get("id");
    if (productId) {
      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(
        (product) => product.id === parseInt(productId)
      );
      populateProduct(product);
    }
  }

  if (location.pathname === "/User/index.html") {
    loadUserIndex();
  }

  if (location.pathname === "/User/cart.html") {
    loadUserCart();
  }

  if (location.pathname === "/User/order.html") {
    loadUserOrder();
  }
  if (
    location.pathname === "/User/order.html" ||
    location.pathname === "/User/cart.html" ||
    location.pathname === "/User/index.html"
  ) {
    updateCartCount();
  }
});

// random number
const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

// creating user id
const getRandomId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = getRandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

// sign In
const btnRef = document.getElementById("btn");
if (btnRef) {
  btnRef.addEventListener("click", () => {
    const emailRef = document.getElementById("email");
    const passwordRef = document.getElementById("password");
    const errorRef = document.getElementById("error");
    const error1Ref = document.getElementById("error1");
    const error2Ref = document.getElementById("error2");
    event.preventDefault();

    if (emailRef.value.length > 0 && passwordRef.value.length > 0) {
      let users = JSON.parse(localStorage.getItem("users"));
      const loggedInUser = users.find(
        (user) =>
          user.email === emailRef.value && user.password === passwordRef.value
      );

      if (!loggedInUser) {
        errorRef.innerText = "Invalid Credentials";
      } else {
        sessionStorage.setItem("userId", loggedInUser.id);
        if (emailRef.value === "admin@gmail.com")
          location.replace("/Admin/index.html");
        else location.replace("/User/index.html");
      }
    } else {
      if (emailRef.value.length === 0 && passwordRef.value.length === 0)
        errorRef.innerText = "Email & Password is empty";
      else if (emailRef.value.length === 0)
        error1Ref.innerText = "Email is empty";
      else if (passwordRef.value.length === 0)
        error2Ref.innerText = "Password is empty";
    }
  });
}

//SignUp

const createButtonRef = document.getElementById("createButton");
if (createButtonRef) {
  createButtonRef.addEventListener("click", () => {
    const emailRef = document.getElementById("email");
    const passwordRef = document.getElementById("password");
    const confirmPasswordRef = document.getElementById("confirmPassword");
    const errorRef = document.getElementById("error");
    const error1Ref = document.getElementById("error1");
    const error2Ref = document.getElementById("error2");
    const error3Ref = document.getElementById("error3");

    event.preventDefault();

    if (
      emailRef.value.length > 0 &&
      passwordRef.value.length > 0 &&
      confirmPasswordRef.value.length > 0
    ) {
      let users = JSON.parse(localStorage.getItem("users"));
      const registerUser = users.find((user) => user.email === emailRef.value);

      if (registerUser) {
        errorRef.innerText = "User Already Exist";
      } else {
        if (passwordRef.value === confirmPasswordRef.value) {
          let users = JSON.parse(localStorage.getItem("users"));

          users.push({
            id: getRandomId(),
            email: emailRef.value,
            password: passwordRef.value,
          });

          localStorage.setItem("users", JSON.stringify(users));
          location.href = "/User/login.html";
        } else {
          error3Ref.innerText = "Password mismatch!!!";
        }
      }
    } else {
      if (
        emailRef.value.length === 0 &&
        passwordRef.value.length === 0 &&
        confirmPasswordRef.value.length === 0
      )
        errorRef.innerText = "Fields are empty";
      else if (emailRef.value.length === 0)
        error1Ref.innerText = "Email is empty";
      else if (passwordRef.value.length === 0)
        error2Ref.innerText = "Password is empty";
      else if (confirmPasswordRef.value.length === 0)
        error3Ref.innerText = "Confirm Password is empty";
    }
  });
}


//Admin Actions
//Add Products
const addProduct = () => {
  const idRef = document.getElementById("id");
  const nameRef = document.getElementById("name");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("description");
  const imageRef = document.getElementById("image");
  const products = JSON.parse(localStorage.getItem("products"));
  let product = JSON.find(localStorage.getItem("products"));

  let id = idRef.value;
  if (id) {
    const product = products.find((product) => product.id === parseInt(id));

    products = products.filter((product) => product.id !== parseInt(id));
    products.push({
      ...product,
      title: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    });
  } else {
    products.push({
      id: getRandomId("products"),
      title: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    });
  }

  localStorage.setItem("products", JSON.stringify(products));
  addProductBtnRef.innerHTML = body;
};

//Populate Product
const populateProduct = (product) => {
  const nameRef = document.getElementById("name");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("description");
  const imageRef = document.getElementById("image");
  const idRef = document.getElementById("id");
  const titleRef = document.getElementById("title");
  const btnRef = document.getElementById("btn");

  idRef.value = product.id;
  nameRef.value = product.title;
  priceRef.value = product.price;
  descriptionRef.value = product.description;
  imageRef.value = product.thumbnail;
  titleRef.innerText = "Edit Product";
  btnRef.innerText = "Update Product";
};

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
    <td>${product.description.substring(0, 30)}...</td>
    <td> ₹ ${product.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onClick="editProductHandler(${
        product.id
      })">Edit</button>
      <button class="btn btn-danger" onClick="deleteProductHandler(${
        product.id
      })">Delete</button>
    </td>
  </tr>`;
  }
  adminIndexProductsRef.innerHTML = body;
};
// delete product - admin page
const deleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filteredProducts));
  loadAdminIndex();
};

// edit product - admin page
const editProductHandler = (id) => {
  location.href = `/Admin/AddProduct.html?id=${id}`;
};

// Products in Index

const loadUserIndex = () => {
  const indexProductsRef = document.getElementById("indexProducts");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<div class="col-4 mt-4">
    <div
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

// Add to cart
const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/User/login.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.userId === parseInt(userId)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
};

// updating cart
const updateCartCount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "/User/login.html";
};

// loadCartPage
const loadUserCart = () => {
  const cartTableRef = document.getElementById("cartTableBody");
  const totalRef = document.getElementById("total");
  const emptyCartRef = document.getElementById("emptyCart");
  const tableRef = document.getElementById("table");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      // if (userCart.length > 0) {
      //   tableRef.classList.remove("visually-hidden");
      //   emptyCartRef.classList.add("visually-hidden");
      // } else {
      //   emptyCartRef.classList.remove("visually-hidden");
      //   tableRef.classList.add("visually-hidden");
      // }

      let body = "";
      let total = 0;
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
                  <td>${cartItem.title}</td>
                  <td>${cartItem.count}</td>
                  <td>${cartItem.price}</td>
                  <td>₹ ${count}</td>
                </tr>`;
      }
      cartTableRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/User/login.html";
    }
  }
};


// checkOutHandler
const checkOut = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      updateCartCount();
      location.href = "/User/index.html";
    } else {
      location.href = "/User/index.html";
    }
  } else {
    location.href = "/User/login.html";
  }
};

// loading order in user Page
const loadUserOrder = () => {
  const tableRef = document.getElementById("table");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let body = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      tableRef.innerHTML = body;
    } else {
      location.href = "/User/index.html";
    }
  } else {
    location.href = "/User/login.html";
  }
};


// loading orders in admin page
const loadAdminOrders = () => {
  const tableRef = document.getElementById("table");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      let body = "";
      for (let order of orders) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        const users = JSON.parse(localStorage.getItem("users"));
        const orderedUser = users.find(
          (user) => user.id === parseInt(order.userId)
        );

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${orderedUser.email}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>
              <select class="form-select" id="status-${order.timestamp}">
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>`;
      }
      tableRef.innerHTML = body;

      for (let order of orders) {
        const statusRef = document.getElementById(`status-${order.timestamp}`);
        statusRef.value = order.status;
        statusRef.addEventListener("change", () => {
          const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
          const updatedOrders = lastUpdatedOrders.map((o) => {
            if (o.timestamp === order.timestamp) {
              return { ...o, status: statusRef.value };
            } else return o;
          });
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        });
      }
    } else {
      location.href = "/User/index.html";
    }
  } else {
    location.href = "/User/login.html";
  }
};