// Timer Class
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

// Načtení stavu při načtení stránky
window.addEventListener("load", () => {
  requestNotificationPermission();
});
