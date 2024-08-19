document.getElementById('cz-flag').addEventListener('click', function() {
    document.querySelector('.main-title').innerText = 'Vítejte v';
    document.querySelector('.main-title2').innerText = 'Mistermind Class';
    document.querySelector('.landing-container p').innerText = 'Připojte se k nám na vzrušující cestě učení a objevování.';
    document.getElementById('startButton').innerText = 'Začít';
});

document.getElementById('en-flag').addEventListener('click', function() {
    document.querySelector('.main-title').innerText = 'Welcome to';
    document.querySelector('.main-title2').innerText = 'Mistermind Class';
    document.querySelector('.landing-container p').innerText = 'Join us in an exciting journey of learning and discovery.';
    document.getElementById('startButton').innerText = 'Start';
});
