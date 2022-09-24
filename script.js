const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";

const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;
  let gameOver = false;
  arrayQuote.forEach((characterSpan, i) => {
    const character = arrayValue[i];
    if (character === null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) renderNewQuotes();
});

const getRandomQuote = function () {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((res) => res.json())
    .then((data) => data.content);
};
const renderNewQuotes = async () => {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((chec) => {
    const checSpan = document.createElement("span");
    checSpan.innerText = chec;
    quoteDisplayElement.appendChild(checSpan);
  });
  quoteInputElement.value = null;

  startTimer();
};

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}


function getTimerTime() {
  let timer = Math.floor((new Date() - startTime) / 1000);
  if (timer === 60) {
    alert("you lose");
    return renderNewQuotes();
  }
  return timer;
}
// function timeStop(timer) {
//   return;
// }

renderNewQuotes();
