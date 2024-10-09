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
                            <img src="${missionary.image}" loading="lazy" alt="Profile picture" class="card-img-top">
                            <div class="card-body">
                                <h4 class="card-title text-primary">${missionary.name}</h4>
                                <h6 class="card-subtitle mb-2 text-muted">Departure Date: ${missionary.departureDate}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Return Date: ??-??-????</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Mission: ${missionary.mission}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Mail:</h6>
                                <a href="mailto:${missionary.gender}" style="font-size: 0.75rem;">
                                    <h4>${missionary.gender}</h4>
                                </a>
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
    setInterval(showSlides, 3000);
  })
  .catch((error) => {
    console.error("Error fetching missionaries:", error);
  });
