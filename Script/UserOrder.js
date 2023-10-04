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
        location.href = "/E-Commerce-WebSite/User/index.html";
      }
    } else {
      location.href = "/E-Commerce-WebSite/Login/login.html";
    }
  };
  