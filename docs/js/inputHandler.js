document.addEventListener("DOMContentLoaded", () => {
  const nameInputsContainer = document.getElementById("nameInputs");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const doneButton = document.getElementById("doneButton");
  const scheduleContainer = document.getElementById("scheduleContainer");
  const scheduleDiv = document.getElementById("schedule");
  const nameInputContainerWrapper = document.querySelector('.name-input-container');
  const changeNamesButton = document.getElementById("changeNamesButton");

  const maxInputs = 6; // Set a limit for maximum inputs

  // Load names and schedule from local storage
  const loadFromLocalStorage = () => {
    const savedNames = JSON.parse(localStorage.getItem('names')) || [];
    const savedSchedule = JSON.parse(localStorage.getItem('schedule')) || [];

    savedNames.forEach((name, index) => {
      addInputField(name);
    });

    if (savedNames.length > 1) {
      generateSchedule(savedNames);
      scheduleContainer.style.display = 'block';
      nameInputContainerWrapper.style.display = 'none';
    }
  };

  // Function to save names and schedule to local storage
  const saveToLocalStorage = (names, schedule) => {
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('schedule', JSON.stringify(schedule));
  };

  // Function to add a new input field
  const addInputField = (value = "") => {
    const currentInputCount = nameInputsContainer.children.length;

    if (currentInputCount < maxInputs) {
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.className = "name-input";
      newInput.placeholder = `Jméno ${currentInputCount + 1}`;
      newInput.autocomplete = "off";
      newInput.value = value;

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

    // Save the schedule to local storage
    saveToLocalStorage(names, names.map((name, index) => ({
      speaker: name,
      feedback: names.filter((_, i) => i !== index).join(", ")
    })));
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
        nameInputContainerWrapper.style.display = "none"; // Hide the name input container
      }
    } else {
      showError("Please enter at least two names.");
    }
  };

  // Function to handle the "Změnit jména" button click
  const handleChangeNamesClick = () => {
    scheduleContainer.style.display = "none"; // Hide the schedule container
    nameInputContainerWrapper.style.display = "block"; // Show the name input container
  };

  // Function to show an error message
  const showError = (message) => {
    alert(message); // Use an alert for now, consider a better UI feedback
  };

  // Add event listeners
  addButton.addEventListener("click", addInputField);
  removeButton.addEventListener("click", removeInputField);
  doneButton.addEventListener("click", handleDoneClick);
  changeNamesButton.addEventListener("click", handleChangeNamesClick); // Add event listener for change names button

  // Initialize by adding one input field
  if (!localStorage.getItem('names')) {
    addInputField();
  } else {
    loadFromLocalStorage();
  }
});

