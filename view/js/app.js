const searchButton = document.querySelector(".search-toggle");
const closeBtn = document.querySelector(".search-close");
const searchBox = document.querySelector(".input-container");

function toggleInput() {
  searchBox.classList.toggle("show-input");
}

searchButton.addEventListener("click", toggleInput);

closeBtn.addEventListener("click", () => {
  searchBox.classList.remove("show-input");
});

if (navigator.userAgent.indexOf("iPhone") > -1) {
  document
    .querySelector("[name=viewport]")
    .setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1"
    );
}
