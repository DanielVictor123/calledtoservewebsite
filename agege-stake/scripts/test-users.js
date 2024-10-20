fetch("missionaries.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const missionariesList = document.getElementById("missionariesList");
    missionariesList.innerHTML = ""; // Clear existing content

    // Create cards
    data.forEach((missionary) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4"); // Ensure cards are in a grid

      card.innerHTML = `
        <div class="card">
          <a href="${missionary.image}" target="_blank">
            <img src="${
              missionary.image
            }" loading="lazy" alt="Profile picture" class="card-img-top">
          </a>
          <div class="card-body">
            <h4 class="text-primary">${missionary.name}</h4>
            <h6 class="mb-2 text-muted">Departure Date: ${
              missionary.departureDate
            }</h6>
            <h6 class="mb-2 text-muted">Mission: ${missionary.mission}</h6>
            <h6 class="mb-2 text-muted">Mail: ${
              missionary.mail || "Not Provided"
            }</h6>
          </div>
        </div>
      `;

      missionariesList.appendChild(card);
    });
  })
  .catch((error) => {
    const missionariesList = document.getElementById("missionariesList");
    missionariesList.innerHTML =
      "<p>Error loading missionaries. Please try again later.</p>";
    console.error("Error fetching missionaries:", error);
  });
