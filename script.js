let seconds = 60;
let wordsIndex = 0;
let correctWordsCounted = 0;
let charactersTyped = 0;
let intervalId;

// Getting all ID's from the HTML

const timer = document.getElementById("timer");
const instruction = document.getElementById("instruction");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const wordContainer = document.getElementById("wordContainer");
const result = document.getElementById("result");

