//JAVASCRIPT SLIDE FUNCTION FOR QUOTES/IMAGE SLIDESHOW STARTS
let slideIndex2 = 0;
const slides2 = document.querySelectorAll(".slide2");
const video2 = document.getElementById("hoverVideo2");

function showSlides() {
  slides2.forEach((slide2, index) => {
    // This removes active classes from all slides
    slide2.classList.remove("active");
    if (index === slideIndex) {
      // This add active classes to the current slide
      slide2.classList.add("active");
    }
  });
  slideIndex2 = (slideIndex + 1) % slides2.length;
}

//This changes slide every 3 seconds
let slideInterval2 = setInterval(showSlides, 3000);

// Initial display
showSlides();
//JAVASCRIPT SLIDE FUNCTION FOR QUOTES/IMAGE SLIDESHOW ENDS
