// variables that connect html elements to the javascript
var startBtn = document.getElementById("startQuiz");
var opener = document.getElementById("opener");
var quiz = document.getElementById("quiz");
var questionSpot = document.getElementById("question");
var answersList = document.getElementById("answersList");
var time = document.getElementById("time");
quiz.style.display = "none";

// global variables that hold values used in the quiz
var startTime = 60;
var timePen = 5;
var score = 0;
var index = 0;

// This is the variable that holds our questions, choices, and the correct answer
var questionsAnswers = [
    {
        question: "Which HTML element do we use to link a JavaScript file to an HTML file?",
        choices: ["A. body", "B. link", "C. html", "D. script"],
        answer: "D. <script>"
      }
      , {
        question: 'The condition in an if/else statement is enclosed within: ',
        choices: ["A. quotes", "B. square brackets", "C. parenthesis", "D. curly brackets"],
        answer: "D. curly brackets"
      }, {
        question: "Which method returns the length of a string?",
        choices: ["A. .index", "B. .length", "C. .size", "D. None of the above"],
        answer: "B. .length"
      }, {
        question: "How do you add a comment in a JavaScript?",
        choices: ["A. 'this is a comment'", "B. <-- this is a comment -->", "C. // this is a comment", "D. /* this is a comment /*"],
        answer: "C. // this is a comment"
      }, {
        question:  " What is the DOM.",
        choices: ["A. Dark Over Matte", "B. Document Orientation Marker", "C. Do Not Open", "D. Document Object Model"],
        answer: "D. Document Object Model"
      }, {
        question: 'What is the correct way to use camel case when declaring variables?', 
        choices: ["CamelCase", "camelcase", "camelCase", "all of the above"],
        answer: "camelCase"
      },
      ];
// event listener that starts quiz and timer
startBtn.addEventListener("click", function() {
    opener.style.display = "none";
    quiz.style.display = "block";
    setInterval(function() {
        startTime--
        time.innerHTML = "Time: " + startTime
        if(startTime <= 0) {
            clearInterval()
            quiz.innerHTML = ""
            questionSpot.innerHTML = "Quiz over you got a score of: " + score;
        }
    }, 1000)
    startQuiz(index)
})

// function that will display questions when the quiz is started and display next quiestions after answered
function startQuiz(index) {
    questionSpot.innerHTML= "";
    answersList.innerHTML = "";
    var userQuestion = questionsAnswers[index].question;
    var userAnswers = questionsAnswers[index].choices;
    questionSpot.innerHTML = userQuestion;
    userAnswers.forEach(function(answer) {
        let listItem = document.createElement("li")
        listItem.innerHTML = answer;
        answersList.appendChild(listItem)
        listItem.addEventListener("click", (rightOrWrong))
    })
}

// this function compares if what was clicked is the right or wrong answer
// Then it adjusts the score, time, and quesstion index
function rightOrWrong(event) {
    let clickedOn = event.target;
    if(clickedOn.textContent === questionsAnswers[index].answer) {
        score = score + 1
      
        console.log("correct")
    } else {
        score = score - 1
        startTime = startTime - timePen
        console.log("wrong")
    }
    if(score <= 0) {
        score = 0
    }
    index++
    if(index >= questionsAnswers.length) {
        quizOver()
    } else {
        startQuiz(index)
    }
}

function quizOver() {
    questionSpot.innerHTML= "Quiz Over!";
    answersList.innerHTML = "You got a score of: " + score;
    var input = document.createElement("input")
    input.type = "text";
    input.id = "initials";
    input.textContent = "";
    quiz.append(input)
    var save = document.createElement("button")
    save.type = "submit";
    save.id = "Submit";
    save.textContent = "Submit";
    quiz.append(save)
    save.addEventListener("click", function() {
        var initials = input.value;
        if (initials === "") {
            alert("Please enter your intials!");
        } else {
            var finalScore = {
                initials: initials,
                score: score
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("score.html");
        }
    })
}

// set up a form to save userinitials and there score to local storage
// set  up a html that displays previous user initials and scores