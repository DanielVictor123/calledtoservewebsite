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

    // Create the cards
    data.forEach((missionary) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");

      // Departure date
      const departureDate = new Date(
        missionary.departureDate.split("-").reverse().join("-")
      );
      let returnDate;

      // Calculate return date based on gender
      if (missionary.gender === "Male") {
        returnDate = new Date(departureDate);
        returnDate.setFullYear(returnDate.getFullYear() + 2);
      } else {
        returnDate = new Date(departureDate);
        returnDate.setMonth(returnDate.getMonth() + 18);
      }

      // Countdown function for both departure and return
      const countdown = () => {
        const now = new Date();
        const timeToDeparture = departureDate - now;
        const timeToReturn = returnDate - now;

        if (timeToReturn < 0) {
          return { text: "Finished (Back Home)", color: "green" };
        }

        if (timeToDeparture < 0) {
          return { text: "Ongoing", color: "green" };
        }

        const daysDeparture = Math.floor(
          timeToDeparture / (1000 * 60 * 60 * 24)
        );
        const hoursDeparture = Math.floor(
          (timeToDeparture % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesDeparture = Math.floor(
          (timeToDeparture % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsDeparture = Math.floor(
          (timeToDeparture % (1000 * 60)) / 1000
        );

        return {
          text: `${daysDeparture} days, ${hoursDeparture} hrs, ${minutesDeparture} min, ${secondsDeparture} sec`,
          color: "red",
        };
      };

      // Create the HTML cards
      card.innerHTML = `
        <div class="card">
          <a href="${missionary.image}" target="_blank">
            <img src="${
              missionary.image
            }" loading="lazy" alt="Profile picture" class="card-img-top">
          </a>
          <div class="card-body">
            <h4 class="text-primary">${missionary.name}</h4>
            <h6 class="mb-2 text-muted">Departure Date: <span class="countdown-departure" style="color: red;">${
              countdown().text
            }</span></h6>
            <h6 class="mb-2 text-muted">Mission: ${missionary.mission}</h6>
            <h6 class="mb-2 text-muted">Mail: ${
              missionary.mail || "Not Provided"
            }</h6>
            <h6 class="mb-2 text-muted">Return Date: <span class="countdown-return" style="color: red;">${
              countdown().text
            }</span></h6>
          </div>
        </div>
      `;

      missionariesList.appendChild(card);

      // Update countdown every second
      setInterval(() => {
        const countdownDepartureElement = card.querySelector(
          ".countdown-departure"
        );
        const countdownReturnElement = card.querySelector(".countdown-return");
        const countdownData = countdown();

        countdownDepartureElement.textContent = countdownData.text;
        countdownDepartureElement.style.color = countdownData.color;

        if (countdownData.text === "") {
          countdownReturnElement.textContent = "Ongoing";
          countdownReturnElement.style.color = "green";
        } else {
          const timeToReturn = returnDate - new Date();
          const daysReturn = Math.floor(timeToReturn / (1000 * 60 * 60 * 24));
          const hoursReturn = Math.floor(
            (timeToReturn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutesReturn = Math.floor(
            (timeToReturn % (1000 * 60 * 60)) / (1000 * 60)
          );
          const secondsReturn = Math.floor((timeToReturn % (1000 * 60)) / 1000);

          if (timeToReturn < 0) {
            countdownReturnElement.textContent = "Finished (Back Home)";
            countdownReturnElement.style.color = "green";
          } else {
            countdownReturnElement.textContent = `${daysReturn} days, ${hoursReturn} hrs, ${minutesReturn} min, ${secondsReturn} sec`;
            countdownReturnElement.style.color = "red";
          }
        }
      }, 1000);
    });
  })
  .catch((error) => {
    const missionariesList = document.getElementById("missionariesList");
    missionariesList.innerHTML =
      "<p>Error loading missionaries. Please try again later.</p>";
    console.error("Error fetching missionaries:", error);
  });

// fetch("missionaries.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     const missionariesList = document.getElementById("missionariesList");
//     missionariesList.innerHTML = ""; // Clear existing content

//     // NOW I'LL CREATE THE CARDS
//     data.forEach((missionary) => {
//       const card = document.createElement("div");
//       card.classList.add("col-md-4", "mb-4"); // Ensure cards are in a grid

//       // NOW I'LL CREATE A CUNTDOWN THAT CALCULATES THE RETURN DATE BASED ON THE DEPARTURE DATE
//       const departureDate = new Date(
//         missionary.departureDate.split("-").reverse().join("-")
//       );
//       let returnDate;

//       // THIS IS TO SPECIFY THE CALCULATIONS BASED ON THE GENDERS, MALE 2 YEARS AND FEMALES 1 YEAR AND 6 MONTHS.
//       if (missionary.gender === "Male") {
//         returnDate = new Date(
//           departureDate.setFullYear(departureDate.getFullYear() + 2)
//         );
//       } else {
//         returnDate = new Date(
//           departureDate.setMonth(departureDate.getMonth() + 18)
//         ); // EXCEPTION OF 1 YEAR AND 6 MONTHS FOR FEMALES
//       }

//       // NOW COMES THE COUNTDOWN CALCULATIONS
//       const countdown = () => {
//         const now = new Date();
//         const timeDiff = returnDate - now;

//         if (timeDiff < 0) {
//           return { text: "Returned!", color: "black" };
//         }

//         const totalDuration = returnDate - departureDate;
//         const remainingDuration = timeDiff;

//         const days = Math.floor(remainingDuration / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (remainingDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         );
//         const minutes = Math.floor(
//           (remainingDuration % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((remainingDuration % (1000 * 60)) / 1000);

//         // THIS IS TO DETERMINE THE COLORS TO BE SHOWN BASED ON THE TIME REMAINING
//         let color;
//         if (remainingDuration > totalDuration / 2) {
//           color = "red"; //RED FOR LOTS OF TIME STILL REMAINING
//         } else if (remainingDuration > totalDuration / 4) {
//           color = "yellow"; // YELLOW FOR HALF OR QUATER OF TIME REMAINING
//         } else {
//           color = "green"; // GREEN FOR LAST QUARTER OR TIMES UP
//         }

//         return {
//           text: `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`,
//           color: color,
//         };
//       };

//       // THIS IS TO CREATE THE HTML CARDS
//       card.innerHTML = `
//         <div class="card">
//           <a href="${missionary.image}" target="_blank">
//             <img src="${
//               missionary.image
//             }" loading="lazy" alt="Profile picture" class="card-img-top">
//           </a>
//           <div class="card-body">
//             <h4 class="text-primary">${missionary.name}</h4>
//             <h6 class="mb-2 text-muted">Departure Date: ${
//               missionary.departureDate
//             }</h6>
//             <h6 class="mb-2 text-muted">Mission: ${missionary.mission}</h6>
//             <h6 class="mb-2 text-muted">Mail: ${
//               missionary.mail || "Not Provided"
//             }</h6>
//             <h6 class="mb-2 text-muted">Return Date Countdown: <span class="countdown" style="color: black;">${
//               countdown().text
//             }</span></h6>
//           </div>
//         </div>
//       `;

//       missionariesList.appendChild(card);

//       // CALLED THE COUNTDOWN FUNCTION TO UPDATE EVERY SECONDS
//       setInterval(() => {
//         const countdownElement = card.querySelector(".countdown");
//         const countdownData = countdown();
//         countdownElement.textContent = countdownData.text;
//         countdownElement.style.color = countdownData.color;
//       }, 1000);
//     });
//   })
//   .catch((error) => {
//     const missionariesList = document.getElementById("missionariesList");
//     missionariesList.innerHTML =
//       "<p>Error loading missionaries. Please try again later.</p>";
//     console.error("Error fetching missionaries:", error);
//   });
