// sets all of our const and variables that we will need for this problem
// the consts use querySelector and getElementById to correctly fill in the elements on the page with questions, answers, and the time left
const question = document.querySelector('#question')
const interface = document.getElementById('game')
const questionChoiceOne = document.getElementById('choiceOne')
const questionChoiceTwo = document.getElementById('choiceTwo')
const questionChoiceThree = document.getElementById('choiceThree')
const questionChoiceFour = document.getElementById('choiceFour')
const timeDisplay = document.getElementById('timeDisplay')
var questionIndex = 0
var score = 0
var seconds = 60
var clock = setInterval(tick, 1000)
// sets a function that says if time left is 0 the quiz ends and if not then the time goes down by 1 second
function tick() {
    if (seconds <= 0) {
        seconds = 0
        timeDisplay.textContent = seconds
        endQuiz()
    } else {
        seconds -= 1
        timeDisplay.textContent = seconds
    }
}
// this var has all of our questions, choices, and answers with the prefix matching our format used on the HTML
var questions = [
    {
        question: 'Commonly used data types do not include:',
        choice1: 'string',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 3,
    },
    {
        question: 'JavaScript is a ____-side programming language:',
        choice1: 'client',
        choice2: 'server',
        choice3: 'both',
        choice4: 'none',
        answer: 3,
    },
    {
        question: 'JavaScript file has an extension of:',
        choice1: '.java',
        choice2: '.js',
        choice3: '.javascript',
        choice4: '.xml',
        answer: 2,
    },
    {
        question: 'Which is the correct way to write a comment in JavaScript:',
        choice1: '{#...#}',
        choice2: '<!---....---!>',
        choice3: '\\....',
        choice4: '//....',
        answer: 4,
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<scripting>',
        choice2: '<script>',
        choice3: '<js>',
        choice4: '<javascript>',
        answer: 2,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'msg("Hello World");',
        choice2: 'alertBox("Hello World");',
        choice3: 'alert("Hello World");',
        choice4: 'msgBox("Hello World");',
        answer: 3,
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'function myFunction()',
        choice2: 'function:myFunction()',
        choice3: 'myFunction()',
        choice4: 'function = myFunction()',
        answer: 1,
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choice1: 'call function myFunction()',
        choice2: 'call myFunction()',
        choice3: 'myFunction() call',
        choice4: 'myFunction()',
        answer: 4,
    },
    {
        question: 'How does a FOR loop start?',
        choice1: 'for (i <= 5; i++',
        choice2: 'for (i = 0; i <= 5)',
        choice3: 'for i = 1 to 5',
        choice4: 'for (i = 0; i <= 5; i++)',
        answer: 4,
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element',
        choice1: 'onclick',
        choice2: 'onchange',
        choice3: 'onmouseclick',
        choice4: 'onmouseover',
        answer: 1,
    }
]
// This function is used to check if the users answer choice matches the answer that we have said is correct for the question
function getNewQuestion() {
    var currentQuestion = questions[questionIndex]
    question.innerHTML = "<h1>" + currentQuestion.question + "</h1>"
    questionChoiceOne.textContent = currentQuestion.choice1
    questionChoiceTwo.textContent = currentQuestion.choice2
    questionChoiceThree.textContent = currentQuestion.choice3
    questionChoiceFour.textContent = currentQuestion.choice4
    questionChoiceOne.onclick = function () { checkAnswer(1)}
    questionChoiceTwo.onclick = function () { checkAnswer(2)}
    questionChoiceThree.onclick = function () { checkAnswer(3)}
    questionChoiceFour.onclick = function () { checkAnswer(4)}
}
// This function will add 1 to score if the click event matches the correct answer in our answer back, if not then the else statement subtracts 10 seconds from the timer
// the second if statement checks if the we are out of available questions in the question bank, if we are then the quiz ends, if not then it increments the questionIndex by 1 and runs the getNewQuestion function
function checkAnswer(event) {
    if (event == questions[questionIndex].answer) {
        score += 1;
    } else {
        seconds -= 10
    }
    if (questionIndex == questions.length - 1) {
        endQuiz()
    } else {
        questionIndex++
        getNewQuestion()
    }
}
// this function grabs the scoreName element and then uses JSON to retrieve our score object from localStorage, then saves the new score in the var newScore, pushes it into the prevScores object, sorts the object by score and time, then saves it back to localStorage
function saveHighScore() {
    var scoreName = document.getElementById("scoreName").value.trim();
    
    if (scoreName) {
        var prevScores = JSON.parse(window.localStorage.getItem('scores')) || [];

        var newScore = {
            name: scoreName,
            score: score,
            time: seconds
        }

        prevScores.push(newScore);

        prevScores.sort((a,b) => b.score - a.score);

        window.localStorage.setItem('scores', JSON.stringify(prevScores));
        window.location.href = "./highscores.html";
    }

}
// this function clears the current time on the clock when the quiz ends and then pushes a gameover message with a score input section into our HTML
function endQuiz() {
    clearInterval(clock)
    interface.innerHTML = `
    <div>
        <h1 class="gameOver">Game Over</h1>
        <input type="text" id="scoreName">
        <button onClick="saveHighScore()" id="saveButton">Save Score</button>
    </div>
    `
}
getNewQuestion()