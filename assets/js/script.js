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
const scores = document.querySelector('#scores');
const highScores = document.querySelector('#scores-page');
const form = document.querySelector('form');
let input = document.querySelector('#name');
const error = document.querySelector('#error');
let currentQuestion = {}
let acceptingAnswers = true
let score;
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
    answer: 4,
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
    choice1: "True",
    choice2: "False",
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
    choice1: "Deletes 'Hello' on a webpage",
    choice2: "Deletes 'Hello' from a sentence",
    choice3: "Prints 'Hello' on a webpage",
    choice4: "Prints 'Hello' to the console",
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
    question: "How do you create a function in JavaScript?",
    choice1: "function myFunction()",
    choice2: "function:myFunction()",
    choice3: "function = myFunction()",
    choice4: "function; myFunction()",
    answer: 1,
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choice1: "callMyFunction()",
    choice2: "call myFunction()",
    choice3: "call function myFunction()",
    choice4: "myFunction()",
    answer: 4,
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    choice1: 'msgBox("Hello World");',
    choice2: 'alert("Hello World"); ',
    choice3: 'alertBox("Hello World");',
    choice4: 'msg("Hello World");',
    answer: 2,
  },
  {
    question: "How can you add a comment in a JavaScript?",
    choice1: "//This is a comment",
    choice2: "<!--This is a comment-->",
    choice3: "'This is a comment",
    choice4: "'This is a comment//",
    answer: 1,
  },
  {
    question: "How to insert a comment that has more than one line?",
    choice1: "/This comment has more than one line/",
    choice2: "//This comment has more than one line//",
    choice3: "<!--This comment has more than one line-->",
    choice4: "/*This comment has more than one line*/",
    answer: 4,
  },
  {
    question: "How do you declare a JavaScript variable?",
    choice1: "v carName;",
    choice2: "variable carName;",
    choice3: "var carName; ",
    choice4: "variableCarName;",
    answer: 3,
  },
  {
    question: "What is the most correct way to change the second value in an array to 1? The array is: var arr =[2,4,5,6]?",
    choice1: "arr[2] = [2, 1, 5, 6]",
    choice2: "arr[1] = 1",
    choice3: "arr[2] = 1",
    choice4: "arr = [2, 1, 5, 6]",
    answer: 2,
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choice1: "=",
    choice2: "x",
    choice3: "-",
    choice4: "*",
    answer: 1,
  },
  {
    question: "What will the following code return: Boolean(10 > 9)",
    choice1: "True",
    choice2: "False",
    choice3: "NaN",
    choice4: "Null",
    answer: 1,
  },
  {
    question: "Floating Point Numbers can also be called...",
    choice1: "Whole numbers",
    choice2: "Decimal numbers",
    choice3: "Even numbers",
    choice4: "Odd numbers",
    answer: 2,
  },

]

let hardQuestions = [
  {
    question: "Data passed into a function during invocation is called....",
    choice1: "Function Execution",
    choice2: "Function Data",
    choice3: "Function Argument",
    choice4: "Function Invocation",
    answer: 3,
  },
  {
    question: "If a variable is declared inside a function, what is that variable called and can that variable be accessed outside the function?",
    choice1: "Local Variable, Yes",
    choice2: "Internal Variable, No",
    choice3: "Internal Variable, Yes",
    choice4: "Local Variable, No",
    answer: 4,
  },
  {
    question: 'querySelectorAll() returns all HTML Elements that match a given css selector while querySelector()......',
    choice1: 'returns the first HTML element that matches the CSS Selector',
    choice2: 'deletes all elements that match the CSS Selector',
    choice3: 'returns the last HTML element that matches the CSS Selector',
    choice4: 'returns all elements that match the CSS Selector',
    answer: 1,
  },
  {
    question: 'How does a WHILE loop start?',
    choice1: 'while (i <= 10; i++)',
    choice2: 'while (i <= 10)',
    choice3: 'while i = 1 to 10',
    choice4: 'while i = 10',
    answer: 2,
  },
  {
    question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    choice1: "if (i <> 5)",
    choice2: "if (i != 5)",
    choice3: "if i <> 5",
    choice4: "if i =! 5",
    answer: 2,
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    choice1: "round(7.25)",
    choice2: "rnd(7.25)",
    choice3: "Math.rnd(7.25)",
    choice4: "Math.round(7.25)",
    answer: 4,
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    choice1: "Math.ceil(x, y)",
    choice2: "Math.max(x, y) ",
    choice3: "ceil(x, y)",
    choice4: "top(x, y)",
    answer: 2,
  },
  {
    question: "How can you detect the client's browser name?",
    choice1: "navigator.appName ",
    choice2: "client.navName",
    choice3: "browser.name",
    choice4: "client.browser",
    answer: 1,
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choice1: "onmouseclick",
    choice2: "onmouseover",
    choice3: "onchange",
    choice4: "onclick",
    answer: 4,
  },
  {
    question: "How does a FOR loop start?",
    choice1: "for i = 1 to 5",
    choice2: "for (i <= 5; i++)",
    choice3: "for (i = 0; i <= 5; i++)",
    choice4: "for (i = 0; i <= 5)",
    answer: 3,
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
      location.reload();
    } else if (element.id === 'easy') {
      window.location.hash = '#easy';
    } else if (element.id === 'medium') {
      window.location.hash = '#medium';
    } else if (element.id === 'hard') {
      window.location.hash = '#hard';
    } else if (element.id === 'highscores-btn') {
      window.location.hash = '#highscores'
    }
  })
}
switchHash();

displayContent = () => {
  let hash = window.location.hash
  // select appropriate questions for each level
  if (hash === '#easy') {
    questions = [...easyQuestions];
  } else if (hash === '#medium') {
    questions = [...mediumQuestions]
  } else if (hash === '#hard') {
    questions = [...hardQuestions]
  }

  // Controls page displayed on screen
  if (hash === '#easy' || hash === '#medium' || hash === '#hard') {
    startGame(questions);
    homePage.style.display = 'none';
    questionsPage.style.display = 'block';
    highScores.style.display = 'none';
    nav.style.display = 'flex';
  }
  else if (hash === '#highscores') {
    homePage.style.display = 'none';
    questionsPage.style.display = 'none';
    highScores.style.display = 'block';
    nav.style.display = 'none';
  }  else {
    homePage.style.display = 'block';
    questionsPage.style.display = 'none';
    highScores.style.display = 'none';
    nav.style.display = 'none';
  }
}
window.addEventListener('hashchange', displayContent);

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    homePage.style.display = 'none';
    questionsPage.style.display = 'none';
    highScores.style.display = 'block';
    window.location.hash = '#highscores';
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

displayLeaderboard = () => {
  let leaderBoard = Object.entries(localStorage);
  let fragment = new DocumentFragment()
  if (leaderBoard) {
    leaderBoard = leaderBoard.sort((a, b) => b[1] - a[1] )
    leaderBoard.forEach(currentItem => {
      const div = document.createElement('div');
      const element = `<span>${currentItem[0]}</span><span>${currentItem[1]}</span>`
      div.innerHTML = element;
      fragment.appendChild(div);
    });
  }
  scores.innerHTML = '';
  scores.appendChild(fragment);
}
displayLeaderboard();

updateHighScores = () => {
  body.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.id === 'name-btn') {
      let inputValue = `${input.value}`;
      input.value = '';
      if (inputValue.length > 1 && input.value <= 10) {
        localStorage.setItem(`${inputValue}`, scoreText.innerText);
        displayLeaderboard();
        form.style.display = 'none';
      }
    }
  });
}
updateHighScores();

window.onload = () => {
  window.location.hash = '#';
  form.style.display = 'block';
};