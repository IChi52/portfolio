// tabs
const tabs = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const targetId = tab.getAttribute('href').substring(1);
        const targetContent  = document.getElementById(targetId);

        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        })

        tab.classList.add("active");
        targetContent.classList.add('active');
        console.log("tab selected: ", tab.href)

    })
})


// slideshow, taken from https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = 1;
showSlides(slideIndex);
function showSlides(n){
    const slides = document.getElementsByClassName("slide-item");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for(let i = 0; i<slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

function adjacentSlide(n){
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
  }