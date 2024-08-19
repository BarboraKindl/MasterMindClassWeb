// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault();  // Zabránění standardnímu odeslání formuláře

    // Zobrazení zprávy po kliknutí na odeslat
    alert('Děkujeme za vaši zpětnou vazbu!');
    
    // Získání hodnoty zprávy a emailu z formuláře
    const message = document.getElementById('message').value;
    const email = document.getElementById('email').value;

    // AJAX požadavek k odeslání zpětné vazby na server
    fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Chyba při odesílání zpětné vazby.');
        }
    })
    .then(data => {
        // Zobrazení úspěšné zprávy a resetování formuláře
        alert('Zpětná vazba byla úspěšně odeslána!');
        document.getElementById('feedbackForm').reset();

        // Přesměrování na hlavní stránku po úspěšném odeslání
        window.location.href = 'public/main.html';
    })
    .catch(error => {
        console.error('Chyba:', error);
        alert('Došlo k chybě při odesílání zpětné vazby. Zkuste to prosím znovu.');
    });
}
