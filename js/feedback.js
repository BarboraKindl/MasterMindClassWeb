// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Děkujeme za vaši zpětnou vazbu!');
    
    // Optional: AJAX call to send feedback to the server
    const message = document.getElementById('message').value;

    fetch('/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        alert('Zpětná vazba byla úspěšně odeslána!');
        document.getElementById('feedbackForm').reset();
    })
    .catch(error => {
        console.error('Chyba:', error);
        alert('Došlo k chybě při odesílání zpětné vazby. Zkuste to prosím znovu.');
    });
}

// Function to handle the back button click
function handleBackButtonClick() {
    // Replace 'main.html' with the actual URL or path of your main page
    window.location.href = 'main.html';
}

// Add event listeners to the DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener for form submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFormSubmit);
    }

    // Attach event listener for back button click
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', handleBackButtonClick);
    }
});
