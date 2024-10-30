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

    data.forEach((missionary) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4"); // Ensure cards are in a grid

      const departureDate = new Date(
        missionary.departureDate.split("-").reverse().join("-")
      );
      let returnDate;

      // Define return date based on gender (2 years for males, 1.5 years for females)
      if (missionary.gender === "Male") {
        returnDate = new Date(
          departureDate.getFullYear() + 2,
          departureDate.getMonth(),
          departureDate.getDate()
        );
      } else {
        returnDate = new Date(
          departureDate.getFullYear(),
          departureDate.getMonth() + 18,
          departureDate.getDate()
        );
      }

      // Countdown function to display time remaining until departure, and switch states after departure
      const countdown = () => {
        const now = new Date();
        let timeDiff, color, text;

        if (now < departureDate) {
          // Calculate countdown to departure
          timeDiff = departureDate - now;
          color = "red";
          text = "Departure in: ";
        } else if (now < returnDate) {
          // Ongoing mission state
          return { text: "Ongoing", color: "green" };
        } else {
          // Finished mission state
          return { text: "Finished (Back Home)", color: "black" };
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        text += `${weeks} weeks, ${
          days % 7
        } days, ${hours} hrs, ${minutes} min, ${seconds} sec`;

        return { text, color };
      };

      // Generate HTML for the card
      card.innerHTML = `
        <div class="card">
          <a href="${missionary.image}" target="_blank">
            <img src="${
              missionary.image
            }" loading="lazy" alt="Profile picture" class="card-img-top">
          </a>
          <div class="card-body">
            <h4 class="text-primary">${missionary.name}</h4>
            <h6 class="mb-2 text-muted">Mission: ${missionary.mission}</h6>
            <h6 class="mb-2 text-muted">Mail: ${
              missionary.mail || "Not Provided"
            }</h6>
            <h6 class="mb-2 text-muted">Status: <span class="countdown" style="color: black;">${
              countdown().text
            }</span></h6>
          </div>
        </div>
      `;

      missionariesList.appendChild(card);

      // Update the countdown every second
      setInterval(() => {
        const countdownElement = card.querySelector(".countdown");
        const countdownData = countdown();
        countdownElement.textContent = countdownData.text;
        countdownElement.style.color = countdownData.color;
      }, 1000);
    });
  })
  .catch((error) => {
    const missionariesList = document.getElementById("missionariesList");
    missionariesList.innerHTML =
      "<p>Error loading missionaries. Please try again later.</p>";
    console.error("Error fetching missionaries:", error);
  });
