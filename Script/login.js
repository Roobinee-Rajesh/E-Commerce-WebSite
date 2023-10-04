// sign In
const btnRef = document.getElementById("btn");
if (btnRef) {
  btnRef.addEventListener("click", () => {
    const emailRef = document.getElementById("email");
    const passwordRef = document.getElementById("password");
    const errorRef = document.getElementById("error");
    const error1Ref = document.getElementById("error1");
    const error2Ref = document.getElementById("error2");
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    event.preventDefault();

    if (emailReg.test(emailRef.value) && passwordRef.value.length > 0) {
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
          location.replace("/E-Commerce-WebSite/Admin/index.html");
        else location.replace("/E-Commerce-WebSite/User/index.html");
      }
    } else {
      if (emailRef.value.length === 0 && passwordRef.value.length === 0)
        errorRef.innerText = "Email & Password is empty";
      else if (!emailReg.test(emailRef.value) || emailRef.value.length === 0)
        error1Ref.innerText = "Email is empty or invalid";
      else if (passwordRef.value.length === 0)
        error2Ref.innerText = "Password is empty";
    }
  });
}