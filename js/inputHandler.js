document.addEventListener("DOMContentLoaded", () => {
  const nameInputsContainer = document.getElementById("nameInputs");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const doneButton = document.getElementById("doneButton");
  const scheduleContainer = document.getElementById("scheduleContainer");
  const scheduleDiv = document.getElementById("schedule");

  const maxInputs = 5; // Set a limit for maximum inputs

  // Function to add a new input field
  const addInputField = () => {
    const currentInputCount = nameInputsContainer.children.length;

    if (currentInputCount < maxInputs) {
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.className = "name-input";
      newInput.placeholder = `Jméno ${currentInputCount + 1}`;
      newInput.autocomplete = "off";

      const newInputRow = document.createElement("div");
      newInputRow.className = "name-input-row";
      newInputRow.appendChild(newInput);

      nameInputsContainer.appendChild(newInputRow);

      // Enable the minus button since there's more than one input
      removeButton.disabled = currentInputCount <= 0;

      // Focus on the new input field
      newInput.focus();
    }

    // Disable add button if we've reached the max number of inputs
    addButton.disabled = currentInputCount + 1 >= maxInputs;
  };

  // Function to remove the last input field
  const removeInputField = () => {
    const currentInputCount = nameInputsContainer.children.length;
    if (currentInputCount > 1) {
      nameInputsContainer.removeChild(nameInputsContainer.lastChild);

      // Enable the add button since we've removed an input
      addButton.disabled = false;

      // Disable the minus button if only one input remains
      removeButton.disabled = currentInputCount - 1 === 1;
    }
  };

  // Function to check for duplicate names
  const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  };

  // Function to generate the schedule
  const generateSchedule = (names) => {
    scheduleDiv.innerHTML = ""; // Clear previous schedule
    names.forEach((name, index) => {
      const speaker = name;
      const feedback = names.filter((_, i) => i !== index);

      // Create a schedule item for each round
      const scheduleItem = document.createElement("div");
      scheduleItem.className = "schedule-item";
      scheduleItem.innerHTML = `
        <strong>Speaker:</strong> ${speaker}<br/>
        <strong>Feedback:</strong> ${feedback.join(", ")}
      `;
      scheduleDiv.appendChild(scheduleItem);
    });
  };

  // Function to handle the "Done" button click
  const handleDoneClick = () => {
    const inputs = document.querySelectorAll(".name-input");
    const names = Array.from(inputs)
      .map((input) => input.value.trim())
      .filter((name) => name !== "");

    if (names.length > 1) {
      if (hasDuplicates(names)) {
        showError("Duplicate names are not allowed. Please enter unique names.");
      } else {
        generateSchedule(names);
        scheduleContainer.style.display = "block"; // Show the schedule
      }
    } else {
      showError("Please enter at least two names.");
    }
  };

  // Function to show an error message
  const showError = (message) => {
    alert(message); // Use an alert for now, consider a better UI feedback
  };

  // Add event listeners
  addButton.addEventListener("click", addInputField);
  removeButton.addEventListener("click", removeInputField);
  doneButton.addEventListener("click", handleDoneClick);

  // Initialize by adding one input field
  addInputField();
});
