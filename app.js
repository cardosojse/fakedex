const types = {
    water: 'images/pkmn-type/water.png', 
    bug: 'images/pkmn-type/bug.png',
    dark: 'images/pkmn-type/dark.png',
    dragon: 'images/pkmn-type/dragon.png',
    electric: 'images/pkmn-type/electric.png',
    fairy: 'images/pkmn-type/fairy.png',
    fighting: 'images/pkmn-type/fighting.png',
    fire: 'images/pkmn-type/fire.png',
    flying: 'images/pkmn-type/flying.png',
    ghost: 'images/pkmn-type/ghost.png',
    grass: 'images/pkmn-type/grass.png',
    ground: 'images/pkmn-type/ground.png',
    ice: 'images/pkmn-type/ice.png',
    normal: 'images/pkmn-type/normal.png',
    poison: 'images/pkmn-type/poison.png',
    psychic: 'images/pkmn-type/psychic.png',
    rock: 'images/pkmn-type/rock.png',
    steel: 'images/pkmn-type/steel.png',
};

const toggleBtn = document.querySelector(".nav-toggle");
const closeBtn = document.querySelector(".nav-close")
const nav = document.querySelector(".nav");
const fixedBtn = document.querySelector(".btn-fixed");

toggleBtn.addEventListener("click", ()=>{
    if(nav.classList.contains("show-nav")){
        nav.classList.remove("show-nav");
    }
    else{
        nav.classList.add("show-nav");
    }
});

closeBtn.addEventListener("click", ()=>{
    nav.classList.remove("show-nav");
});

window.addEventListener("scroll", function(){
    if (window.scrollY >= 100){
        fixedBtn.classList.add("visible");
    } else {
        fixedBtn.classList.remove("visible");
    }
});

if (navigator.userAgent.indexOf('iPhone') > -1 ) {
    document.querySelector("[name=viewport]").setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1");
}

const pkmnNum = document.querySelector(".pkmn-num");
const pkmnName = document.querySelector(".pkmn-name");
const pkmnImg = document.querySelector(".pkmn-img");
const pkmnCategory = document.querySelector(".pkmn-category");
const pkmnAbility = document.querySelector(".pkmn-ability");
const pkmnHeight = document.querySelector(".pkmn-height");
const pkmnWeight = document.querySelector(".pkmn-weight");
const pkmnType = document.querySelector(".pkmn-type--container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const searchInput = document.querySelector("#input-search");
const shinyBtn = document.querySelector(".btn-shiny");

let currentPkmn = 0;
let thisValue = true;

const initApp = () => {
    fetch("pkmn.json")
    .then(response => response.json())
    .then((data) => {
        
    });
}

initApp();

window.addEventListener("DOMContentLoaded", () => {
    const pkmnObj = pokemons[currentPkmn];
    pkmnImg.src = pkmnObj.img;
    pkmnNum.textContent = pkmnObj.num;
    pkmnName.textContent = pkmnObj.name;
    pkmnCategory.textContent = pkmnObj.category;
    pkmnAbility.textContent = pkmnObj.ability;
    pkmnHeight.textContent = pkmnObj.height;
    pkmnWeight.textContent = pkmnObj.weight;
    let imgChild = '';
    pkmnObj.pokemonTypes.forEach(function (typeUrl) {
        imgChild += `<img src=${typeUrl} class="pkmn-type">`
    })
    pkmnType.innerHTML += imgChild;
});

function showData(pkmn){
    const pkmnObj = pokemons[pkmn]
    pkmnImg.src = pkmnObj.img;
    pkmnNum.textContent = pkmnObj.num;
    pkmnName.textContent = pkmnObj.name;
    pkmnCategory.textContent = pkmnObj.category;
    pkmnAbility.textContent = pkmnObj.ability;
    pkmnHeight.textContent = pkmnObj.height;
    pkmnWeight.textContent = pkmnObj.weight;
    let imgChild = '';
    pkmnObj.pokemonTypes.forEach(function (typeUrl) {
        imgChild += `<img src=${typeUrl} class="pkmn-type">`
    })
    pkmnType.innerHTML = imgChild;
}

prevBtn.addEventListener("click", function(){
    currentPkmn--;
    if (currentPkmn < 0){
        currentPkmn = pokemons.length - 1;
    }
    showData(currentPkmn);
    thisValue = true;
});

nextBtn.addEventListener("click", function(){
    currentPkmn++;
    if (currentPkmn > pokemons.length - 1){
        currentPkmn = 0;
    }
    showData(currentPkmn);
    thisValue = true;
});

searchInput.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        if (isNaN(searchInput.value)){
            alert("Not a number");
        }
        if (searchInput.value > 113){
            alert("Not available")
        }
        let pkmnId = searchInput.value - 1;
        currentPkmn = pkmnId;
        showData(pkmnId);
        nav.classList.remove("show-nav");
        searchInput.value = "";
    } 
});

shinyBtn.addEventListener("click", function(){
    const pkmnObj = pokemons[currentPkmn];
    if (thisValue){
        pkmnImg.src = pkmnObj.shiny;
        thisValue = false;
        return
    }
    pkmnImg.src = pkmnObj.img;
    thisValue = true;
});


// const cardSection = document.querySelector(".card__section");

// function showFakedex(){
//     pokemons.forEach((value) =>{
//         let pkmnCard = document.createElement("div");
//         pkmnCard.classList.add("pkmn-card");
//         pkmnCard.innerHTML = `
//             <span class="pkmn-num">${value.num}</span>
//             <img src=${value.img} alt="pokemon image" class="pkmn-card-img">
//         `
//     });
//     cardSection.appendChild(pkmnCard);    
// }
