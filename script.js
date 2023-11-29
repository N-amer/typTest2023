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
    seconds--; // hiermee zeg je dat de waarde van de tijd afgeteld moet worden
    timer.textContent = seconds; // dus: Timer eLement = timerValue = 60 seconden, het print alleen de inhoud.
    if (seconds <= 0) {
      // als de tijdwaarde 0 is, laat het aftellen stoppen en het resultaat zichtbaar maken.
      clearInterval(intervalId);
      // showResult();
    }
  }, 1000);
}

// async maakt het resultaat van de functie een promise/belofte
async function getNextWord() {
  const response = await fetch("https://random-word-bit.vercel.app/word"); // lekker wachten tot voltooiing, zodat je niet vast komt te zitten terwijl je wacht.
  const randomWord = JSON.parse(await response.text()); // parse maakt de JSON object een string van.
  wordElement.textContent = randomWord[0].word;
  while (wordContainer.firstChild) {
    wordContainer.removeChild(wordContainer.firstChild);
  }
  input.addEventListener("keydown", (event) =>{
    if (event.key === "Enter") {
        const userInput = input.value.trim().toLowerCase();
        const correctWord = randomWord[0].word.toLowerCase();
        charactersTyped += userInput.length;
        if (userInput === correctWord) {
            correctWordsCounted++;
            wordsIndex++;
            getNextWord();
        } else {
            input.value = ""; // Reset de waarde van het invoerveld
            input.placeholder = randomWord[0].word;
            setTimeout(() => {
                input.classList.remove("shake-animation")
            }, 500);
        }
    }
  });
  input.focus();
}
function showResult() {
    //resultaat krjgt inhoud en verschijnt, resetknop verschijnt, startknop en woordcontainer verdwijnen
    const resultText = `Je typte ${correctWordsCounted} woord(en) (${charactersTyped} karakters) per minuut.`;
    result.textContent = resultText;
    result.style.display = "block";
    resetButton.style.display = "block";
    startButton.style.display = "none";
    wordContainer.style.display = "none";
  }
  
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    instruction.style.display = "none";
    seconds = 60;
    correctWordsCounted = 0;
    charactersTyped = 0;
    wordsIndex = 0;
    wordContainer.innerHTML = "";
    timer.textContent = seconds;
    startTimer();
    getNextWord();
  });
  
  resetButton.addEventListener("click", () => {
    resetButton.style.display = "none";
    startButton.style.display = "block";
    result.style.display = "none";
    seconds = 60;
    charactersTyped = 0;
    correctWordsCounted = 0;
    wordsIndex = 0;
    wordContainer.innerHTML = "";
    instruction.style.display = "block";
    timer.textContent = seconds;
  });