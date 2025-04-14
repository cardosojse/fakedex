const pkmnNum = document.querySelector(".pkmn-num");
const pkmnName = document.querySelector(".pkmn-name");
const pkmnImg = document.querySelector(".pkmn-img");
const pkmnCategory = document.querySelector(".pkmn-category");
const pkmnAbility = document.querySelector(".pkmn-ability");
const pkmnHeight = document.querySelector(".pkmn-height");
const pkmnWeight = document.querySelector(".pkmn-weight");
const pkmnType = document.querySelector(".pkmn-type--container");
const pkmnEvo = document.querySelector(".pkmn-evo--container");
const evoSection = document.querySelector(".evolution__section");
const cardColor = document.querySelector(".info__section");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const searchInput = document.querySelector("#search-input");
const shinyBtn = document.querySelector(".btn-shiny");
const altFormBtn = document.querySelector(".btn-form");
const errorMsg = document.querySelector(".error-msg");

const MIN_PKMN_ID = 1;
const MAX_PKMN_ID = 123;
let currentPkmn = 0;
let notShiny = true;

function updateTypes(types) {
  pkmnType.innerHTML = types
    .map((type) => `<img src=${type} class="pkmn-type">`)
    .join("");
}

function updateEvolutions(evolution) {
  pkmnEvo.innerHTML = evolution
    .map(
      (pkmnStage, idx) =>
        ` <i class="ph ph-arrow-down arrow-${idx}"></i>
        <div>
          <div class="pkmn-evo--box">
              <img src=${pkmnStage.img} alt="pkmn image" class="pkmn-evo--img">
          </div>
          <div class="pkmn-evo--id">
              <div class="pkmn-evo--name">${pkmnStage.name}</div>
              <div class="row">
                  <span>No.</span>
                  <p class="pkmn-evo--num">${pkmnStage.num}</p>
              </div>
          </div>
        </div>
      `
    )
    .join("");
}

function getPkmn(pkmn) {
  pkmnImg.src = pkmn.img;
  pkmnNum.textContent = pkmn.num;
  pkmnName.textContent = pkmn.name;
  pkmnCategory.textContent = pkmn.category;
  pkmnAbility.textContent = pkmn.ability;
  pkmnHeight.textContent = pkmn.height;
  pkmnWeight.textContent = pkmn.weight;
  cardColor.style.backgroundColor = pkmn.cardColor;

  updateTypes(pkmn.pokemonTypes);

  if (pkmn.evolution && pkmn.evolution.length > 0) {
    updateEvolutions(pkmn.evolution);
  } else {
    evoSection.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getPkmn(pokemons[currentPkmn]);
});

function showPkmn(pkmn) {
  getPkmn(pokemons[pkmn]);
}

function catchErrors(input) {
  const value = Number(input.value);

  if (isNaN(value) || value < MIN_PKMN_ID || value > MAX_PKMN_ID) {
    input.classList.add("error-input");
    errorMsg.textContent = `Please, type a number between ${MIN_PKMN_ID} and ${MAX_PKMN_ID}!`;
    removeError();

    return false;
  }

  return true;
}

function prevPkmn() {
  currentPkmn--;
  if (currentPkmn < 0) {
    currentPkmn = pokemons.length - 1;
  }
  showPkmn(currentPkmn);
  notShiny = true;
}

function nextPkmn() {
  currentPkmn++;
  if (currentPkmn > pokemons.length - 1) {
    currentPkmn = 0;
  }
  showPkmn(currentPkmn);
  notShiny = true;
}

function removeError() {
  setTimeout(function () {
    searchInput.classList.remove("error-input");
    errorMsg.textContent = "";
  }, 3000);
}

prevBtn.addEventListener("click", prevPkmn);
nextBtn.addEventListener("click", nextPkmn);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    prevPkmn();
  }

  if (event.key === "ArrowRight") {
    nextPkmn();
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (!catchErrors(searchInput)) return;

    let pkmnId = searchInput.value - 1;
    currentPkmn = pkmnId;
    showPkmn(pkmnId);

    searchBox.classList.remove("show-input");
  }
});

// need to refactor
function togglePkmnImg(event) {
  const { img, shiny, altForm } = pokemons[currentPkmn];
  const targetBtn = event.currentTarget;

  if (targetBtn === shinyBtn) {
    if (notShiny) {
      pkmnImg.src = shiny;
      notShiny = false;
    } else {
      pkmnImg.src = img;
      notShiny = true;
    }
  } else if (targetBtn === altFormBtn) {
    if (notShiny) {
      pkmnImg.src = altForm;
      notShiny = false;
    } else {
      pkmnImg.src = img;
      notShiny = true;
    }
  }
}

shinyBtn.addEventListener("click", togglePkmnImg);
altFormBtn.addEventListener("click", togglePkmnImg);
