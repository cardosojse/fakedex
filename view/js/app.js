const toggleBtn = document.querySelector(".search-toggle");
const closeBtn = document.querySelector(".search-close");
const showInput = document.querySelector(".input-container");
const fixedBtn = document.querySelector(".btn-fixed");

toggleBtn.addEventListener("click", () => {
  if (showInput.classList.contains("show-input")) {
    showInput.classList.remove("show-input");
  } else {
    showInput.classList.add("show-input");
  }
});

closeBtn.addEventListener("click", () => {
  showInput.classList.remove("show-input");
});

if (navigator.userAgent.indexOf("iPhone") > -1) {
  document
    .querySelector("[name=viewport]")
    .setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1"
    );
}
