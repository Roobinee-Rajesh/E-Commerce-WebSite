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

let initialUsers = [
  { id: 1, email: "admin@admin.com", password: "admin@admin.com" },
  { id: 2, email: "user@user.com", password: "user" },
];

window.addEventListener("load", () => {
  // loading products
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
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
const btnRef=document.getElementById("btn");
const signIn = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");
event.defaultPrevented();
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
      if (emailRef.value === "admin@admin.com")
        location.replace("/pages/admin/index.html");
      else location.replace("/pages/index.html");
    }
  } else {
    errorRef.innerText = "Email or password is empty";
  }
};

// sign Up
const signUp = () => {
  const emailRef = document.getElementById("regemail");
  const passwordRef = document.getElementById("regpassword");
  const confirmPasswordRef = document.getElementById("confirmPassword");
  const errorRef = document.getElementById("error");

  if (
    emailRef.value.length > 0 &&
    passwordRef.value.length > 0 &&
    confirmPasswordRef.value.length > 0
  ) {
    if (passwordRef.value === confirmPasswordRef.value) {
      let users = JSON.parse(localStorage.getItem("users"));

      users.push({
        id: getRandomId(),
        email: emailRef.value,
        password: passwordRef.value,
      });

      localStorage.setItem("users", JSON.stringify(users));
      location.href = "/pages/login.html";
    } else {
      errorRef.innerText = "Password mismatch!!!";
    }
  } else {
    errorRef.innerText = "Fields are empty";
  }
};

// user singout handler
const userSignOut = () => {
  location.replace("/pages/login.html");
};
