// Main Page lements
var body = document.body;
var h1El = document.createElement("h1");
var infoEl = document.createElement("div");
var introTextEl = document.createElement("div");
var btnStartEl = document.createElement("button");
var highScoreEl = document.createElement("p");
var timerEL = document.createElement("div");
var timerlabelEl = document.createElement("p");
var timerCounter = document.createElement("p");
//elemensts for question
var qstn = document.createElement("h3");
var olEl = document.createElement("ol");
var div = document.createElement("div");
var displayAnsEl = document.createElement("p");

//highscore page
var btnClearHighscore = document.createElement("button");
btnClearHighscore.textContent = "Clear Highscore";
var formEl = document.createElement("form");
var gobackBtnEl = document.createElement("button");
gobackBtnEl.textContent = "Go Back";

var score = 0;
var questionNumber = 1;
var timeLeft = 100;
var timeInterval = "";

//The object which will contain all the questions ans their possible answers
var qstns = {
  question1: {
    question: "The Capital of Malaysia is:",
    option1: "Tehran",
    option2: "Kuala Lampur",
    option3: "Karachi",
    option4: "Mumbai",
    correct: "Kuala Lampur",
  },
  question2: {
    question: "The Capital of Iran is:",
    option1: "Islamabad",
    option2: "Kabul",
    option3: "Tehran",
    option4: "Almaty",
    correct: "Tehran",
  },
  question3: {
    question: "The capital of Pakistan is:",
    option1: "Karachi",
    option2: "Lahore",
    option3: "Peshawar",
    option4: "Islamabad",
    correct: "Islamabad",
  },
  question4: {
    question: "The capital of Saudi Arabia is:",
    option1: "Riyadh",
    option2: "Jeddah",
    option3: "Manama",
    option4: "Adis Ababa",
    correct: "Riyadh",
  },
};

//Main Page Text Content
h1El.textContent = "Countries Capitals Challenge";
introTextEl.textContent =
  "Guess the country's capital correctly and you will be awarded 10 points with time increased by 10 seconds. On wrong answer 10 seconds will be deducy";
btnStartEl.textContent = "Start";
highScoreEl.textContent = "View Highscore";
timerlabelEl.textContent = "Time:";
timerCounter.textContent = "100 seconds";

//Appending all the main page elements
body.appendChild(highScoreEl);
body.appendChild(timerEL);
timerEL.appendChild(timerlabelEl);
timerEL.appendChild(timerCounter);
body.appendChild(h1El);
body.appendChild(infoEl);
infoEl.appendChild(introTextEl);
infoEl.appendChild(btnStartEl);

//Highscore on click listener
highScoreEl.addEventListener("click", function () {
  clearText();
  clearQuestion();
  displayHighScore();
});

//The listener on the start button. It will clear the intro text and the button and will start the time and the first quesiton will be displayed
btnStartEl.addEventListener("click", function (event) {
  //the function call to clear the intor text and start button
  clearText();

  //function to start the timer
  var timeInterval = setInterval(function () {
    // If the counter is greate than 1 when need to decrement it by 1
    if (timeLeft >= 0) {
      timerCounter.textContent = timeLeft + " seconds";
      timeLeft--;
    } else if (
      qstns["question" + [questionNumber]] != undefined &&
      timeLeft < 0
    ) {
      //WHen the time reaches zero. it will stop the interval. clear the question ans answers text and display the quiz score
      clearInterval(timeInterval);
      clearQuestion();
      quizEnd();
    }
  }, 1000);

  mainFunction();

  /*Listener on the option clicked as an answer. if the correct answer is
  clicked then the score and timer will be increased by 10 if not the timer will be decreased by 10 seconds
  */
  olEl.addEventListener("click", function (event) {
    var element = event.target;
    //checking if its a correct answer or else part is for wrong answer
    if (
      element.dataset.number == qstns["question" + [questionNumber]].correct
    ) {
      console.log(`Correct Answer`);
      score = score + 10;
      timeLeft += 10;
      displayAnsEl.textContent = "Correct";
      div.appendChild(displayAnsEl);
      //Delaying the result display by a second
      const myTimeout = setTimeout(function () {
        clearQuestion();
        mainFunction();
      }, 500);
    } else {
      timeLeft = timeLeft - 10;
      displayAnsEl.textContent = "Wrong";
      div.appendChild(displayAnsEl);
      const myTimeout = setTimeout(function () {
        clearQuestion();
        mainFunction();
      }, 500);
    }
  });
});

//clearing text function
function clearText() {
  h1El.textContent = "";
  introTextEl.textContent = "";
  btnStartEl.setAttribute("style", "display:none");
}

//This will clear the Question ans Answers Text from the screen
function clearQuestion() {
  qstn.textContent = "";
  olEl.textContent = "";
  questionNumber++;
  displayAnsEl.textContent = "";
}

//This will display the question needed on the screen along with the 4 answers
function mainFunction() {
  //here we check if we still have a valid question. if yes then it will be displayed if not we will skip to the score part in else condition
  if (qstns["question" + [questionNumber]] != undefined) {
    qstn.textContent = qstns["question" + [questionNumber]].question;
    infoEl.appendChild(qstn);
    qstn.setAttribute("style", "text-align:left; margin-left:20px");

    for (var x = 1; x <= 4; x++) {
      var ansEl = document.createElement("li");

      //using this variable for on click listener on items
      var answer = qstns["question" + [questionNumber]]["option" + [x]];
      ansEl.setAttribute("data-number", answer);
      ansEl.textContent = qstns["question" + [questionNumber]]["option" + [x]];
      ansEl.setAttribute(
        "style",
        "text-align:left; align: left; background-color: #DDDDDD; padding-left:-120px; padding-top:6px; margin-left:-10px; margin-top: 1px; height:40px;"
      );

      //Appending
      infoEl.appendChild(qstn);
      infoEl.appendChild(olEl);
      olEl.appendChild(ansEl);
      infoEl.appendChild(div);
    }
  } else {
    clearInterval(timeInterval);
    clearQuestion();
    quizEnd();
  }
}

//This function will display the highScores
function displayHighScore() {
  var highScoreTxt = document.createElement("h3");
  highScoreTxt.textContent = "Highscores";
  infoEl.appendChild(highScoreTxt);

  console.log(JSON.parse(localStorage.getItem("user")));
  var userData = JSON.parse(localStorage.getItem("user"));
  var scoreDisplay = document.createElement("p");
  scoreDisplay.textContent = userData.name + " - " + userData.score;
  infoEl.appendChild(scoreDisplay);

  infoEl.appendChild(formEl);
  formEl.appendChild(gobackBtnEl);
  infoEl.appendChild(btnClearHighscore);

  btnClearHighscore.addEventListener("click", function () {
    localStorage.clear();
    scoreDisplay.textContent = "";
  });
}

//This function will display the form so the user can enter theri name so it can be stored locally
function quizEnd() {
  clearInterval(timeInterval);
  console.log(`I was in Endblock`);
  var quizEnd = document.createElement("H4");
  quizEnd.textContent = "Quiz Ended";
  infoEl.appendChild(quizEnd);

  var totalScore = document.createElement("p");
  totalScore.textContent = "Your score is: " + score;
  infoEl.append(totalScore);

  var label = document.createElement("label");
  label.textContent = "Name:";
  infoEl.appendChild(label);

  var input = document.createElement("input");
  infoEl.appendChild(input);

  var btnSubmit = document.createElement("button");
  btnSubmit.textContent = "Submit";
  infoEl.appendChild(btnSubmit);

  btnSubmit.addEventListener("click", function () {
    var user = {
      name: input.value.trim(),
      score: score,
    };

    // set new submission to local storage
    localStorage.setItem("user", JSON.stringify(user));
    quizEnd.textContent = "";
    totalScore.textContent = "";
    label.textContent = "";
    btnSubmit.setAttribute("style", "display:none");
    input.setAttribute("style", "display:none");
    displayHighScore();
  });
}

//Style Part. Here all the global styling will be applied

h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");
infoEl.setAttribute("style", "margin:auto; width:50%; text-align:center;");
//imgEl.setAttribute("src", "http://placekitten.com/200/300");
introTextEl.setAttribute(
  "style",
  "font-size:20px; text-align:center;padding:20px;"
);
timerEL.setAttribute(
  "style",
  "text-align: right; margin-top:-50px;margin-right:20px"
);

btnStartEl.setAttribute(
  "style",
  "color: #fff; background-color: #037AD6; width: 150px; height: 50px;border-radius: 3px;font: 700 20px sans-serif;"
);
timerlabelEl.setAttribute("style", "display: inline-block;");
timerCounter.setAttribute("style", "display: inline-block;padding-left:3px;");
gobackBtnEl.setAttribute("style", "padding:10px; margin:10px");
btnClearHighscore.setAttribute("style", "padding:10px;");
