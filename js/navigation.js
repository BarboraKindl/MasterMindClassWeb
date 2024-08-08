// Back button logic for main.html
document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "index.html"; // Ensure this matches your actual landing page file name
    });
  }
});

// Start button logic for index.html
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "main.html"; // Ensure this matches your actual main page file name
    });
  }
});
