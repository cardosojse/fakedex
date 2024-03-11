const toggleBtn = document.querySelector(".nav-toggle");
const closeBtn = document.querySelector(".nav-close")
const nav = document.querySelector(".nav");

toggleBtn.addEventListener("click", ()=>{
    if(nav.classList.contains("show-nav")){
        nav.classList.remove("show-nav");
    }
    else{
        nav.classList.add("show-nav");
    }
})

closeBtn.addEventListener("click", ()=>{
    nav.classList.remove("show-nav");
})

if (navigator.userAgent.indexOf('iPhone') > -1 ) {
    document.querySelector("[name=viewport]")
     .setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1");
}