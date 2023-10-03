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
          location.href = "/Login/login.html";
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