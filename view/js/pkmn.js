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
const MAX_PKMN_ID = pokemons.length;
let currentPkmn = 0;
let isShiny = false;
let isAltForm = false;
let errorTimeoutId;

function updateTypes(types) {
  pkmnType.innerHTML = types
    .map((type) => `<img src=${type} class="pkmn-type">`)
    .join("");
}

function updateEvolutions(evolution) {
  pkmnEvo.innerHTML = evolution
    .map(
      (pkmnStage, idx) =>
        `
          <i class="ph ph-arrow-down arrow-${idx}"></i>
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

function updateForms(form) {
  pkmnEvo.innerHTML = form
    .map(
      (pkmnStage, idx) =>
        `
          <i class="ph ph-arrows-down-up arrow-${idx}"></i>
          <div>
            <div class="pkmn-evo--box">
                <img src=${pkmnStage.img} alt="pkmn image" class="pkmn-evo--img">
            </div>
            <div class="pkmn-evo--id">
                <div class="pkmn-evo--name">${pkmnStage.name}</div>
                <div class="row">
                    <p class="pkmn-evo--num">${pkmnStage.num}</p>
                </div>
            </div>
          </div>
        `
    )
    .join("");
}

function handleEvolution(evolution) {
  const hasEvolution = evolution.length > 0;
  evoSection.style.display = hasEvolution ? "block" : "none";

  if (!hasEvolution) return;

  if (currentPkmn === 110 || currentPkmn === 111) {
    updateForms(evolution);
  } else {
    updateEvolutions(evolution);
  }
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
  handleEvolution(pkmn.evolution);
}

window.addEventListener("DOMContentLoaded", () => {
  showPkmn(currentPkmn);
});

function resetPkmnState() {
  isShiny = false;
  isAltForm = false;
}

function showPkmn(pkmnIndex) {
  resetPkmnState();
  getPkmn(pokemons[pkmnIndex]);

  altFormBtn.style.display = pokemons[pkmnIndex].altForm ? "block" : "none";
}

function findPkmnByName(name) {
  const normalizedName = name.trim().toLowerCase();

  return pokemons.findIndex(
    (pkmn) => pkmn.name.toLowerCase() === normalizedName
  );
}

function findPkmn(query) {
  const normalizedQuery = query.trim();
  const isNumber = /^\d+$/.test(normalizedQuery);

  if (isNumber) {
    const pkmnId = Number(normalizedQuery);

    if (pkmnId >= MIN_PKMN_ID && pkmnId <= MAX_PKMN_ID) {
      return pkmnId - 1;
    }

    return -1;
  }

  return findPkmnByName(normalizedQuery);
}

function showSearchError() {
  clearTimeout(errorTimeoutId);
  searchInput.classList.add("error-input");
  errorMsg.textContent = `Enter a number between ${MIN_PKMN_ID} and ${MAX_PKMN_ID} or a Pokemon name.`;

  errorTimeoutId = setTimeout(() => {
    searchInput.classList.remove("error-input");
    errorMsg.textContent = "";
  }, 3000);
}

function searchPkmn(query) {
  const pkmnIndex = findPkmn(query);

  if (pkmnIndex === -1) {
    showSearchError();
    return;
  }

  currentPkmn = pkmnIndex;
  showPkmn(currentPkmn);
  searchInput.value = "";
  toggleInput();
}

function prevPkmn() {
  currentPkmn--;
  if (currentPkmn < 0) {
    currentPkmn = pokemons.length - 1;
  }
  showPkmn(currentPkmn);
}

function nextPkmn() {
  currentPkmn++;
  if (currentPkmn > pokemons.length - 1) {
    currentPkmn = 0;
  }
  showPkmn(currentPkmn);
}

function togglePkmnImg(event) {
  const { img, shiny, altForm, altFormShiny } = pokemons[currentPkmn];
  const targetBtn = event.currentTarget;

  if (targetBtn === shinyBtn) {
    isShiny = !isShiny;
  } else if (altForm && targetBtn === altFormBtn) {
    isAltForm = !isAltForm;
    isShiny = false;
  }

  if (isAltForm && isShiny && altFormShiny) {
    pkmnImg.src = altFormShiny;
  } else if (isAltForm) {
    pkmnImg.src = altForm;
  } else if (isShiny) {
    pkmnImg.src = shiny;
  } else {
    pkmnImg.src = img;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.target === searchInput) return;

  if (event.key === "ArrowLeft") {
    prevPkmn();
  }

  if (event.key === "ArrowRight") {
    nextPkmn();
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPkmn(searchInput.value);
  }
});

prevBtn.addEventListener("click", prevPkmn);
nextBtn.addEventListener("click", nextPkmn);
shinyBtn.addEventListener("click", togglePkmnImg);
altFormBtn.addEventListener("click", togglePkmnImg);
