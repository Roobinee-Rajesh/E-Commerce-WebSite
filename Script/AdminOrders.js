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
              <td>${orderedUser.email}</td>
              <td>${formattedDate}</td>
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
        location.href = "/E-Commerce-WebSite/User/index.html";
      }
    } else {
      location.href = "/E-Commerce-WebSite/Login/login.html";
    }
  };