let timerSeconds = "";
let wordsIndex = 0;
let correctWordCount = 0;
let charactersTyped = 0;
let intervalId;

const timer = document.getElementById("timer");
const instruction = document.getElementById("instruction");
const chooseContainer = document.getElementById("choose-container");
const btn30 = document.getElementById("btn30");
const btn60 = document.getElementById("btn60");
const btn120 = document.getElementById("btn120");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const wordContainer = document.getElementById("wordContainer");
const result = document.getElementById("result");

resetButton.style.display = "none"; // op het begin zal de reset knop niet verschijnen.
stopButton.style.display = "none";
chooseContainer.style.display = "none";

//het resultaat wordt een promise.
// een promise helpt je om dingen op het juiste volgorde te zetten
// zodat je niet vast blijft te zitten, terwijl je wacht.
async function getNextWord() {
  const response = await fetch("https://random-word-bit.vercel.app/word"); // lekker wachten tot voltooiing.
  const randomWord = JSON.parse(await response.text()); // hier ook, parse maakt de JSON text een string van.

  return randomWord;
}

function displayNextWord(randomWord) {
  while (wordContainer.firstChild) {
    wordContainer.removeChild(wordContainer.firstChild);
  }

  const wordElement = document.createElement("div"); // maak een nieuwe div aan
  wordElement.classList.add("words"); // het voegen van een class in de div
  wordElement.textContent = randomWord[0].word; // de inhoud van de 1ste object pakken en het uitprinten in HTML.
  wordContainer.appendChild(wordElement);

  const inputElement = document.createElement("input"); // pak de inputveld van de html
  inputElement.type = "text";
  inputElement.classList.add("textField");
  inputElement.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const userInput = inputElement.value.trim().toLowerCase();
      const correctWord = randomWord[0].word.toLowerCase();
      charactersTyped += userInput.length;

      if (userInput === correctWord) {
        correctWordCount++;
        wordsIndex++;
        const nextWord = await getNextWord();
        displayNextWord(nextWord);
      } else {
        inputElement.value = ""; // Reset de waarde van het invoerveld
        inputElement.placeholder = randomWord[0].word;
        inputElement.classList.add("shake-animation");
        setTimeout(() => {
          inputElement.classList.remove("shake-animation");
        }, 500);
      }
    }
  });

  wordContainer.appendChild(wordElement);
  wordContainer.appendChild(inputElement);
  inputElement.focus();
}

function startTimer() {
  // met het ID kan je de setinterval later stoppen met clearInterval.
  intervalId = setInterval(() => {
    timerSeconds--; // hiermee zeg je dat de waarde van de tijd afgeteld moet worden.
    timer.textContent = timerSeconds; // dus: timerELement = timerSeconds = 60
    if (timerSeconds === 0) {
      // als de tijdwaarde 0 is, laat het aftellen stoppen en het resultaat zichtbaar maken.
      clearInterval(intervalId);
      showResult();
    }
  }, 1000);
}

function showResult() {
  //resultaat krjgt inhoud en verschijnt, resetknop verschijnt, startknop en woordcontainer verdwijnen.
  const resultText = `You typed ${correctWordCount} word(s), ${charactersTyped} characters per minute.`;
  result.textContent = resultText;
  result.style.display = "block";
  resetButton.style.display = "block";
  startButton.style.display = "none";
  stopButton.style.display = "none";
  wordContainer.style.display = "none";
}

startButton.addEventListener("click", () => {
  chooseContainer.style.display = "block";
  startButton.style.display = "none";
  stopButton.style.display = "none";
  wordContainer.innerHTML = "";
  instruction.style.display = "none";
  timerSeconds = 30;
});

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  showResult();
  stopButton.style.display = "none";
});

resetButton.addEventListener("click", () => {
  resetButton.style.display = "none";
  stopButton.style.display = "none";
  chooseContainer.style.display = "none";
  startButton.style.display = "block";
  result.style.display = "none";
  timerSeconds = 30;
  charactersTyped = 0;
  correctWordCount = 0;
  wordsIndex = 0;
  wordContainer.innerHTML = "";
  instruction.style.display = "block";
  timer.textContent = timerSeconds;
  location.reload();
});

btn30.addEventListener("click", () => {
  startButton.style.display = "none";
  stopButton.style.display = "block";
  wordContainer.innerHTML = "";
  instruction.style.display = "none";
  chooseContainer.style.display = "none";
  correctWordCount = 0;
  charactersTyped = 0;
  wordsIndex = 0;
  wordContainer.innerHTML = "";
  timer.textContent = 30;
  timerSeconds = 30;
  startTimer();
  // Dit haalt asynchroon het volgende woord op voor de type-test met behulp van getNextWord -
  // - en geeft het vervolgens weer met displayNextWord zodra de process voltooid is.
  getNextWord().then((randomWord) => displayNextWord(randomWord));
});

btn60.addEventListener("click", () => {
  startButton.style.display = "none";
  stopButton.style.display = "block";
  wordContainer.innerHTML = "";
  instruction.style.display = "none";
  chooseContainer.style.display = "none";
  correctWordCount = 0;
  charactersTyped = 0;
  wordsIndex = 0;
  wordContainer.innerHTML = "";
  timer.textContent = 60;
  timerSeconds = 60;
  startTimer();
  getNextWord().then((randomWord) => displayNextWord(randomWord));
});

btn120.addEventListener("click", () => {
  startButton.style.display = "none";
  stopButton.style.display = "block";
  wordContainer.innerHTML = "";
  instruction.style.display = "none";
  chooseContainer.style.display = "none";
  correctWordCount = 0;
  charactersTyped = 0;
  wordsIndex = 0;
  wordContainer.innerHTML = "";
  timer.textContent = 120;
  timerSeconds = 120;
  startTimer();
  getNextWord().then((randomWord) => displayNextWord(randomWord));
});