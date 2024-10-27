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

    // NOW I'LL CREATE THE CARDS
    data.forEach((missionary) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4"); // Ensure cards are in a grid

      // NOW I'LL CREATE A CUNTDOWN THAT CALCULATES THE RETURN DATE BASED ON THE DEPARTURE DATE
      const departureDate = new Date(
        missionary.departureDate.split("-").reverse().join("-")
      );
      let returnDate;

      // THIS IS TO SPECIFY THE CALCULATIONS BASED ON THE GENDERS, MALE 2 YEARS AND FEMALES 1 YEAR AND 6 MONTHS.
      if (missionary.gender === "Male") {
        returnDate = new Date(
          departureDate.setFullYear(departureDate.getFullYear() + 2)
        );
      } else {
        returnDate = new Date(
          departureDate.setMonth(departureDate.getMonth() + 18)
        ); // EXCEPTION OF 1 YEAR AND 6 MONTHS FOR FEMALES
      }

      // NOW COMES THE COUNTDOWN CALCULATIONS
      const countdown = () => {
        const now = new Date();
        const timeDiff = returnDate - now;

        if (timeDiff < 0) {
          return { text: "Returned!", color: "black" };
        }

        const totalDuration = returnDate - departureDate;
        const remainingDuration = timeDiff;

        const days = Math.floor(remainingDuration / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingDuration % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingDuration % (1000 * 60)) / 1000);

        // THIS IS TO DETERMINE THE COLORS TO BE SHOWN BASED ON THE TIME REMAINING
        let color;
        if (remainingDuration > totalDuration / 2) {
          color = "red"; //RED FOR LOTS OF TIME STILL REMAINING
        } else if (remainingDuration > totalDuration / 4) {
          color = "yellow"; // YELLOW FOR HALF OR QUATER OF TIME REMAINING
        } else {
          color = "green"; // GREEN FOR LAST QUARTER OR TIMES UP
        }

        return {
          text: `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`,
          color: color,
        };
      };

      // THIS IS TO CREATE THE HTML CARDS
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
            <h6 class="mb-2 text-muted">Return Date Countdown: <span class="countdown" style="color: black;">${
              countdown().text
            }</span></h6>
          </div>
        </div>
      `;

      missionariesList.appendChild(card);

      // CALLED THE COUNTDOWN FUNCTION TO UPDATE EVERY SECONDS
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
