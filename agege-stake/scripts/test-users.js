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

    // Create a carousel item
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item", "active"); // Set first item as active

    // Create a row for grid layout
    let row = document.createElement("div");
    row.classList.add("row");

    // Loop through each missionary and create HTML
    data.forEach((missionary, index) => {
      const missionaryCard = document.createElement("div");
      missionaryCard.classList.add("col-12", "col-sm-6", "col-md-4");

      missionaryCard.innerHTML = `
        <div class="card container mt-5">
          <img src="${missionary.image}" loading="lazy" alt="Profile picture" class="card-img-top">
          <div class="card-body">
            <h4 class="card-title text-primary">${missionary.name}</h4>
            <h6 class="card-subtitle mb-2 text-muted">Departure Date: ${missionary.departureDate}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Return Date: ??-??-????</h6>
            <h6 class="card-subtitle mb-2 text-muted">Mission: ${missionary.mission}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Mail:</h6>
            <a style="display:none;" href="mailto:${missionary.mail}" style="font-size: 0.75rem;">
              <h4>${missionary.mail}</h4>
            </a>
            <button style="display:none;" class="button open-button">More</button>
          </div>
        </div>
      `;

      // THIS WILL APPEND THE CARD TO THE ROW
      row.appendChild(missionaryCard);

      // FOR EVERY 3 MISSIONARIES, THIS WILL CREATE A NEW CAROUSEL ITEM
      if ((index + 1) % 3 === 0) {
        carouselItem.appendChild(row);
        missionariesList.appendChild(carouselItem);
        // Reset for the next carousel item
        carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        row = document.createElement("div");
        row.classList.add("row");
      }
    });

    // THIS WILL APPEND THE LAST ROWS IF ANY CARDS
    if (row.children.length > 0) {
      carouselItem.appendChild(row);
      missionariesList.appendChild(carouselItem);
    }
  })
  .catch((error) => {
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

//     // Clear existing content if any
//     missionariesList.innerHTML = "";

//     // Loop through each missionary and create HTML
//     data.forEach((missionary) => {
//       const missionaryCard = document.createElement("div");
//       missionaryCard.classList.add("missionaries_card");

//       missionaryCard.innerHTML = `
//           <img src="${missionary.image}" loading="lazy" alt="Profile picture" class="profile">
//           <div class="details">
//               <h3>${missionary.name}</h3>
//               <h3>Departure Date: ${missionary.departureDate}</h3>
//               <h3>Mission: ${missionary.mission}</h3>
//               <h3>Mail:</h3>
//               <a style="display:none;" href="mailto:${missionary.mail}" style="font-size: 0.75rem;">
//                     <h4>${missionary.mail}</h4>
//                 </a>
//                <a style=text-decoration="underline;" ></a>
//               <button style="display:none;" class="button open-button">More</button>
//           </div>
//         `;
//       missionariesList.appendChild(missionaryCard);
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching missionaries:", error);
//   });
