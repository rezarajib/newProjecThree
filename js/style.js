// global variable declaration
let count = 0;
let timer;
let quizData;
let answers = [];

// Dom elements called
let startQuiz = document.querySelector("#startQuiz");
let rulesContainer = document.querySelector("#rulesContainer");
let alertContainer = document.querySelector("#alertContainer");
let submitContainer = document.querySelector("#submitContainer");
let quizContainer = document.querySelector("#quizContainer");
let answersContainer = document.querySelector("#answersContainer");
let displayResult = document.querySelector("#displayResult");

// EventListener for quiz start button
startQuiz.addEventListener("click", () => {
  let countDown = document.querySelector("#countDownContainer");
  let counter = document.querySelector("#counter");
  let counterNum = 2;
  countDown.classList.remove("hidden");
  countDown.classList.add("flex");

  let x = setInterval(() => {
    if (counterNum < 0) {
      countDown.classList.remove("flex"); // fix typo here
      countDown.classList.add("hidden");
      counterNum = 3;
      count = 0;
      timer = null;
      quizData = null;
      answers = [];
      rulesContainer.classList.add("hidden");
      alertContainer.classList.remove("hidden");
      submitContainer.classList.remove("hidden");
      submitContainer.classList.add("flex");
      loadQuiz();
      quizTimer();
      clearInterval(x);
    }
    counter.innerText = counterNum;
    counterNum--;
  }, 1000);
});

// All quiz data fetched from json
const loadQuiz = async () => {
  const res = await fetch("./data/quiz.json");
  const data = await res.json(); // fix missing parentheses here
  quizData = data;
  displayQuiz(data);
};

// Displaying quiz on quiz page
const displayQuiz = (data) => {
  quizContainer.innerHTML = ""; // clear the previous quiz before displaying a new one
  if (!data) {
    return;
  }

  data.forEach((quiz, i) => {
    quizContainer.innerHTML += `<div class="m-3 py-3 px-4 shadow-sm rounded">
  <div class="flex items-center">
    <div class="h-8 w-8 bg-green-300 rounded-full flex justify-center items-center text-green-800 mr-3">
      ${i + 1}
    </div>
    <p class="text-gray-800 text-sm">${quiz.question}</p> // fix typo here
  </div>
  <div class="grid grid-cols-2 gap-4 mt-5">
    ${displayQuizOptions(quiz.options, i)}
  </div>
</div>`;
  });
};

// EventListener for quiz submit button
document.querySelector("#submit").addEventListener("click", () => { // fix typo here
  if (answers.length < 6) {
    alert("Please answer all questions."); // add alert message when user has not answered all questions
    return;
  }
  quizTimer(true);
  answersContainer.innerHTML = `<div class="my-4">
  <i class="fa-solid fa-fan animate-spin text-2xl text-green-600"></i>
  <p class="text-xs animate-pulse">Please Wait, We are checking...</p>
</div>`;
  let timeTaken = document.querySelector("#count");
  let totalMark = 0;
  let grade = {
    status: "",
    color: "",
  };

  for (let ans of answers) {
    if (ans.answer === ans.givenAns) {
      totalMark += 10;
    }
  }

  // EventListener for quiz submit button
document.querySelector("#submit").addEventlistener("click", () => {
    if (answers.length < 6) {
      return;
    }
    quizTimer(true);
    answersContainer.innerHTML = `<div class="my-4">
    <i class="fa-solid fa-fan animate-spin text-2xl text-green-600"></i>
    <p class="text-xs animate-pulse">Please Wait, We are checking...</p>
  </div>`;
    let timeTaken = document.querySelector("#count");
    let totalMark = 0;
    let grade = {
      status: "",
      color: "",
    };
  
    for (let ans of answers) {
      if (ans.answer === ans.givenAns) {
        totalMark += 10;
      }
    }
