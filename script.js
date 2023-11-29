let seconds = 60;
let wordsIndex = 0;
let correctWordsCounted = 0;
let charactersTyped = 0;
let intervalId;

// Alle Id's pakken vanuit de HTML

const timer = document.getElementById("timer");
const instruction = document.getElementById("instruction");
const input = document.getElementById("inputElement");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const wordContainer = document.getElementById("wordContainer");
const result = document.getElementById("result");

resetButton.style.display = "none"; // op het begin zal de reset knop niet verschijnen
input.style.display = "none"; // op het begin zal de inputElement niet verschijnen

function startTimer() {
     // met het ID kan je de setinterval later stoppen met clearInterval
    let intervalId = setInterval(() => {
        seconds--;  // hiermee zeg je dat de waarde van de tijd afgeteld moet worden
        timer.textContent = seconds; // dus: Timer eLement = timerValue = 60 seconden, het print alleen de inhoud.
        if (seconds <= 0) {
             // als de tijdwaarde 0 is, laat het aftellen stoppen en het resultaat zichtbaar maken.
            clearInterval(intervalId);
            // showResult();
        }

    }, 1000);
}

// async maakt vhet resultaat van de functie een promise/belofte
async function getNextWord() {
    const response = await fetch("https://random-word-bit.vercel.app/word"); // lekker wachten tot voltooiing, zodat je niet vast komt te zitten terwijl je wacht.
    const randomWord = JSON.parse(await response.text()); // parse maakt de JSON object een string van.

}