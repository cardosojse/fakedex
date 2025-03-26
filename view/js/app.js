const toggleBtn = document.querySelector(".nav-toggle");
const closeBtn = document.querySelector(".nav-close");
const nav = document.querySelector(".nav");
const fixedBtn = document.querySelector(".btn-fixed");

toggleBtn.addEventListener("click", () => {
  if (nav.classList.contains("show-nav")) {
    nav.classList.remove("show-nav");
  } else {
    nav.classList.add("show-nav");
  }
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("show-nav");
});

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    fixedBtn.classList.add("visible");
  } else {
    fixedBtn.classList.remove("visible");
  }
});

if (navigator.userAgent.indexOf("iPhone") > -1) {
  document
    .querySelector("[name=viewport]")
    .setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1"
    );
}
