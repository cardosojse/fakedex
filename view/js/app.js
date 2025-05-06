const searchButton = document.querySelector(".search-toggle");
const closeBtn = document.querySelector(".search-close");
const searchBox = document.querySelector(".input-container");

function openInput() {
  searchBox.classList.toggle("show-input");
  searchButton.style.display = searchBox.classList.contains("show-input")
    ? "none"
    : "block";
}

searchButton.addEventListener("click", () => {
  openInput();
});

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
