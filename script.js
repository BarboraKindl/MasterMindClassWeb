// Zvuk pro pípnutí
const beepSound = document.getElementById("beep-sound");

// Funkce pro spuštění konfet
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.6 },
  });
}

// Změna pozadí
const backgrounds = [
  "images/honeycomb-pattern1.png",
  "images/honeycomb-pattern2.png",
  "images/honeycomb-pattern3.png",
];
let currentBackgroundIndex = 0;

const changeBackgroundButton = document.getElementById("changeBackgroundButton");

changeBackgroundButton.addEventListener("click", () => {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = `url('${backgrounds[currentBackgroundIndex]}')`;
});

// Aktualizace data a času
function updateDateTime() {
  const datetimeElement = document.getElementById("datetime");
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

// Aktualizace každou sekundu
setInterval(updateDateTime, 1000);

// Třída pro časovač
class Timer {
  constructor(name, duration, displayElement, startButton, pauseButton, resetButton) {
    this.name = name;
    this.duration = duration;
    this.displayElement = displayElement;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.resetButton = resetButton;
    this.timeLeft = duration;
    this.countdown = null;
    this.isPaused = false;

    this.startButton.addEventListener("click", () => this.start());
    this.pauseButton.addEventListener("click", () => this.pause());
    this.resetButton.addEventListener("click", () => this.reset());

    this.loadSavedState();
  }

  start() {
    if (this.isPaused) {
      this.isPaused = false;
    } else {
      clearInterval(this.countdown);
      const now = Date.now();
      const then = now + this.timeLeft * 1000;

      this.displayTimeLeft(this.timeLeft);

      this.countdown = setInterval(() => {
        if (!this.isPaused) {
          const secondsLeft = Math.round((then - Date.now()) / 1000);
          if (secondsLeft <= 0) {
            clearInterval(this.countdown);
            beepSound.play();
            launchConfetti();
            this.updateHistory();
            showNotification(`${this.name} Timer`, "Váš časovač vypršel!");
            localStorage.removeItem(`timeLeft${this.name}`);
            return;
          }
          this.displayTimeLeft(secondsLeft);
        }
      }, 1000);
    }

    this.startButton.disabled = true;
    this.pauseButton.disabled = false;
  }

  pause() {
    this.isPaused = true;
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
    localStorage.setItem(`timeLeft${this.name}`, this.timeLeft);
  }

  reset() {
    clearInterval(this.countdown);
    this.timeLeft = this.duration;
    this.displayTimeLeft(this.timeLeft);
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
    this.isPaused = false;
    localStorage.removeItem(`timeLeft${this.name}`);
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    this.displayElement.textContent = display;
    this.timeLeft = seconds;
  }

  updateHistory() {
    const historyList = document.getElementById("history-list");
    const timestamp = new Date().toLocaleString("cs-CZ");
    const entry = document.createElement("li");
    entry.textContent = `${this.name} dokončen v ${timestamp}`;
    historyList.appendChild(entry);

    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(`${this.name} dokončen v ${timestamp}`);
    localStorage.setItem("history", JSON.stringify(history));
  }

  loadSavedState() {
    const savedTimeLeft = localStorage.getItem(`timeLeft${this.name}`);
    if (savedTimeLeft !== null) {
      this.timeLeft = parseInt(savedTimeLeft);
      this.displayTimeLeft(this.timeLeft);
    }
  }
}

// Požadavek na povolení notifikací
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });
  }
}

// Zobrazení notifikace
function showNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "images/timer-icon.png",
    });
  }
}

// Inicializace časovačů
const timer1 = new Timer(
  "Speaker",
  300,
  document.getElementById("timer1"),
  document.getElementById("startButton1"),
  document.getElementById("pauseButton1"),
  document.getElementById("resetButton1")
);

const timer2 = new Timer(
  "Feedback",
  120,
  document.getElementById("timer2"),
  document.getElementById("startButton2"),
  document.getElementById("pauseButton2"),
  document.getElementById("resetButton2")
);

// Načtení stavu a historie při načtení stránky
window.addEventListener("load", () => {
  requestNotificationPermission();

  // Načtení historie
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const historyList = document.getElementById("history-list");
  history.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
});
