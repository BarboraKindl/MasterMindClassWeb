// Function to update the date and time
function updateDateTime() {
    const datetimeElement = document.getElementById("datetime");
    if (datetimeElement) {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formattedDateTime = now.toLocaleDateString("cs-CZ", options);
      datetimeElement.textContent = formattedDateTime;
    }
  }
  
  // Update datetime every second
  setInterval(updateDateTime, 1000);
  
  // Initial call to set the datetime on load
  window.addEventListener("load", updateDateTime);
  