fetch("missionaries.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const missionariesList = document.getElementById("missionariesList");

    // Clear existing content if any
    missionariesList.innerHTML = "";

    // Create slides
    data.forEach((missionary, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      slide.innerHTML = `
                        <div class="card mt-5">
                          <a href="https://danielvictor123.github.io/calledtoservewebsite/agege-stake/missionaries.html">
                            <img src="${missionary.image}" loading="lazy" alt="Profile picture" class="card-img-top">
                          </a>
                            <div class="card-body">
                                <h4 class=" text-primary ">${missionary.name}</h4>
                                <h6 class=" mb-2 text-muted ">Mission: ${missionary.mission}</h6>
                                <h6 class=" mb-2 text-muted ">Mail: ${missionary.mail}</h6>
                            </div>
                        </div>
                    `;

      missionariesList.appendChild(slide);
    });

    // Set the first slide as active
    if (missionariesList.children.length > 0) {
      missionariesList.children[0].classList.add("active");
    }

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlides() {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }

    // Change slides every 3 seconds
    setInterval(showSlides, 5000);
  })
  .catch((error) => {
    console.error("Error fetching missionaries:", error);
  });
