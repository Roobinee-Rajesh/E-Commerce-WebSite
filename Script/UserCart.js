//AddToCart
const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/E-Commerce-WebSite/Login/login.html";
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
  } else location.href = "/E-Commerce-WebSite/Login/login.html";
};

// loadCartPage
const loadUserCart = () => {
  const cartTableBodyRef = document.getElementById("cartTableBody");
  const cartTableHeadRef = document.getElementById("cartTableHead");
  const cartTableEndRef = document.getElementById("cartTableEnd");
  const emptyCartRef = document.getElementById("emptyCart");
  const totalRef = document.getElementById("total");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length === 0 || userCart.length === NULL) {
        let empty = "";
        empty = `<div class="d-flex flex-column align-items-center"><h3>Cart is empty</h3>
        <button style="background-color:blue; color:white; width:200px"><a style="color:white; text-decoration:none" href="/E-Commerce-WebSite/User/index.html">Continue Shopping</a></button></div>`;

        emptyCartRef.innerHTML = empty;
      } else {
        let body = "";
        let head = "";
        let end = "";
        let total = 0;
        head = `<tr>
        <th scope="col">Product</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col">Total Price</th>
      </tr>`;
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
        end += `<p class="fs-5 text-center" id="total">Total-₹ ${total} </p>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary" id="userCartBtn" onclick="checkOut()">
            Checkout
          </button>`;
        cartTableHeadRef.innerHTML = head;
        cartTableBodyRef.innerHTML = body;
        cartTableEndRef.innerHTML = end;
        // totalRef.innerText = `Total - ₹ ${total}`;
      }
    } else {
      location.href = "/E-Commerce-WebSite/Login/login.html";
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
      location.href = "/E-Commerce-WebSite/User/index.html";
    } else {
      location.href = "/E-Commerce-WebSite/User/index.html";
    }
  } else {
    location.href = "/E-Commerce-WebSite/Login/login.html";
  }
};
