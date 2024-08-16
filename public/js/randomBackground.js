// Array of background images
const backgrounds = [
  "../images/honeycomb-pattern1.png",
  "../images/honeycomb-pattern2.png",
  "../images/honeycomb-pattern3.png",
];

// Function to select a random background image and store it in localStorage
function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const randomBackground = backgrounds[randomIndex];
  document.body.style.backgroundImage = `url('${randomBackground}')`;

  // Store the selected background in localStorage
  localStorage.setItem("selectedBackground", randomBackground);
}

// Function to apply the stored background image
function applyStoredBackground() {
  const storedBackground = localStorage.getItem("selectedBackground");
  if (storedBackground) {
    document.body.style.backgroundImage = `url('${storedBackground}')`;
  }
}

// Set the background when the page loads on index.html
window.addEventListener("load", function () {
  if (document.getElementById("startButton")) {
    setRandomBackground();
  }
});

// Apply stored background and change on button click in main.html
window.addEventListener("load", function () {
  if (document.getElementById("changeBackgroundButton")) {
    applyStoredBackground(); // Apply stored background on main page load

    const changeBackgroundButton = document.getElementById(
      "changeBackgroundButton"
    );
    changeBackgroundButton.addEventListener("click", setRandomBackground);
  }
});
