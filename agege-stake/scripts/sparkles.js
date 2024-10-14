const audio = document.getElementById("background-music");

// THIS IS TO UNMUTE THE AUDIO AFTER THE USER CLICKS ANYWHERE ON THE PAGE
window.addEventListener("click", function () {
  if (audio.muted) {
    audio.muted = false;
    audio.play();
  }
});

// THIS IS TO STOP THE AUDIO WHEN THE PAGE IS HIDDEN OR WHEN NAVIGATING AWAY FROM THE PAGE
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    audio.pause();
  } else {
    audio.play();
  }
});

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  document.body.appendChild(sparkle);

  // THIS MAKES THE SPARKLES IN RANDOM SIZES OF 5-15
  const size = Math.random() * 10 + 5;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${Math.random() * window.innerWidth}px`;
  sparkle.style.top = `${Math.random() * window.innerHeight}px`;

  sparkle.addEventListener("animationend", () => {
    sparkle.remove();
  });
}

// THIS IS TO CREATE THE SPARKLES EVERY 300MS WHILE THE MUSIC IS PLAYING
setInterval(createSparkle, 300);
