const body = document.querySelector('body');
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const level = document.querySelectorAll('.level');
const nav = document.querySelector('nav');
const homePage = document.querySelector('#home-page');
const questionsPage = document.querySelector('#questions-page')
const endPage = document.querySelector('#end-page');
// const easy = document.querySelector('#easy'); 
// const medium = document.querySelector('#medium'); 
// const hard = document.querySelector('#hard'); 

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let questions = [];
let availableQuestions = []
let easyQuestions = [
  {
    question: "What is JavaScript?",
    choice1: "A Web Browser",
    choice2: "A Programming/Scripting Language",
    choice3: "A Game",
    choice4: "An App",
    answer: 2,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choice1: "The <title> tag",
    choice2: "The <body> section",
    choice3: "The <head> section",
    choice4: "Both the <head> section and the <body> section are correct",
    answer: 1,
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choice1: '<source = "xxx.js">',
    choice2: '<script href="xxx.js">',
    choice3: '<script name="xxx.js">',
    choice4: '<script src="xxx.js">',
    answer: 4,
  },
  {
    question: "Who created JavaScript and in what year?",
    choice1: "Brendan Eich, 1985",
    choice2: "Guido van Rossum, 1991",
    choice3: "Brendan Eich, 1995",
    choice4: "Guido van Rossum, 1995",
    answer: 3,
  },
  {
    question: "JavaScript is the same as Java.",
    choice1: "False",
    choice2: "True",
    choice3: "Maybe",
    choice4: "All of the above",
    answer: 1,
  },
  {
    question: "Is JavaScript case-sensitive?",
    choice1: "True",
    choice2: "False",
    choice3: "Maybe",
    choice4: "Sometimes",
    answer: 1,
  },
  {
    question: "What does this code do? console.log('Hello')",
    choice1: "Deletes 'Hello' on a webpage",
    choice2: "Deletes 'Hello' from a sentence",
    choice3: "Prints 'Hello' on a webpage",
    choice4: "Print 'Hello' to the console",
    answer: 4,
  },
  {
    question: "When a phrase like 'blue bag' is written as 'blueBag' when used as a variable name, this is called.....",
    choice1: "Donkey's Bag",
    choice2: "Donkey's Tail",
    choice3: "Camel Case",
    choice4: "Camel Tail",
    answer: 3,
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    choice1: "True",
    choice2: "False",
    choice3: "Maybe",
    choice4: "Sometimes",
    answer: 2,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<js>",
    choice3: "<javascript>",
    choice4: "<scripting>",
    answer: 1,
  },
]

let mediumQuestions = [
  {
    question: "I am medium questions?",
    choice1: "A Web Browser",
    choice2: "A Programming/Scripting Language",
    choice3: "A Game",
    choice4: "An App",
    answer: 2,
  },
  {
    question: "I am medium second question?",
    choice1: "A Web Browser",
    choice2: "A Programming/Scripting Language",
    choice3: "A Game",
    choice4: "An App",
    answer: 2,
  },

]

let hardQuestions = [
  {
    question: "I am hard questions?",
    choice1: "A Web Browser",
    choice2: "A Programming/Scripting Language",
    choice3: "A Game",
    choice4: "An App",
    answer: 2,
  },
  {
    question: "I am hard second question?",
    choice1: "A Web Browser",
    choice2: "A Programming/Scripting Language",
    choice3: "A Game",
    choice4: "An App",
    answer: 2,
  },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = (questions) => {
  questionCounter = 0
  score = 0
  availableQuestions = questions;
  getNewQuestion()
}

switchHash = () => {
  body.addEventListener('click', (event) => {
    let element = event.target;
    if (element.classList.contains('heading')) {
      window.location.hash = '#';
    } else if (element.id === 'easy') {
      window.location.hash = '#easy';
    } else if (element.id === 'medium') {
      window.location.hash = '#medium';
    } else if (element.id === 'hard') {
      window.location.hash = '#hard';
    }
  })
}
switchHash(); 

displayContent = () => {
  let hash = window.location.hash
  // select appropriate questions for each level
  if (hash === '#easy') {
    console.log('good')
    questions = [...easyQuestions];
  } else if (hash === '#medium') {
    console.log('medium')
    questions = [...mediumQuestions]
  } else if (hash === '#hard') {
    console.log('hard')
    questions = [...hardQuestions]
  }

  // Controls page displayed on screen
  if (hash) {
    console.log('futs')
    startGame(questions);
    homePage.style.display = 'none';
    questionsPage.style.display = 'block';
    endPage.style.display = 'none';
    nav.style.display = 'flex';
  } else {
    homePage.style.display = 'block';
    questionsPage.style.display = 'none';
    endPage.style.display = 'none';
    nav.style.display = 'none';
  }
}
window.addEventListener('hashchange', displayContent);

// todo:create display end page function
// todo: create option for highscore, homepage and endpage

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    homePage.style.display = 'none';
    questionsPage.style.display = 'none';
    endPage.style.display = 'block';
    startGame([...easyQuestions]);
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset["number"]
    choice.innerText = currentQuestion["choice" + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"]

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)

  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

// startGame()