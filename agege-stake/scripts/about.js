//JAVASCRIPT SLIDE FUNCTION FOR ABOUT US STARTS
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide, index) => {
    // This removes the active classes from all slides
    slide.classList.remove("active");
    if (index === slideIndex) {
      //This adds active class to the current slide
      slide.classList.add("active");
    }
  });
  slideIndex = (slideIndex + 1) % slides.length;
}

// This change the slides every 3 seconds.
let slideInterval = setInterval(showSlides, 3000);

// Initial display
showSlides();
//JAVASCRIPT SLIDE FUNCTION FOR ABOUT US ENDS
