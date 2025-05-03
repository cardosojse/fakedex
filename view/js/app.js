const searchButton = document.querySelector(".search-toggle");
const closeBtn = document.querySelector(".search-close");
const searchBox = document.querySelector(".input-container");

function openInput() {
  if (searchBox.classList.contains("show-input")) {
    searchInput.style.display = "none";
    searchBox.classList.remove("show-input");
  } else {
    searchBox.classList.add("show-input");
    searchInput.style.display = "inline-block";
  }
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
