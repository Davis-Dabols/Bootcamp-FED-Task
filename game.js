const maxNumOfQuestions = 1;
let questionIndex;
let score;
let questions = [];
let answers = [];
let correctAnswer;

let questionsLeftElement = document.getElementById("questions-left");
let questionElement = document.getElementById("question")
let answerElement = Array.from(document.getElementsByClassName("answer-button"));

startGame();

async function startGame() 
{
    questionIndex = 0;
    score = 0;

    await fetch("https://opentdb.com/api.php?amount=" + maxNumOfQuestions + "&type=multiple")
    .then((response) => response.json())
    .then((data) => questions = data.results);
    console.log(questions);

    nextQuestion();
}

function nextQuestion() 
{
    questionElement.innerText = questions[questionIndex].question
        .replaceAll("&quot;", "\"")
        .replaceAll("&#039;", "\'");

    correctAnswer = questions[questionIndex].correct_answer;
    getAnswers(questionIndex);

    answerElement.forEach((element, index) => {
        element.innerText = answers[index]
            .replaceAll("&quot;", "\"")
            .replaceAll("&#039;", "\'");
    });

    questionsLeftElement.innerText = (questionIndex + 1) + '/' + maxNumOfQuestions;
}

function getAnswers() 
{
    let randomStartIndex = Math.floor(Math.random() * 4);
    answers[randomStartIndex] = correctAnswer
    for(let x = 1; x < 4; x++)
    {
        answers[(randomStartIndex + x) % 4] = questions[questionIndex].incorrect_answers[x - 1];
    }
}

answerElement.forEach(element => {
    element.addEventListener("click", answer =>
    {
        let selectedElement = answer.target;
        let selectedAnswer = answers[selectedElement.dataset.number];

        if (selectedAnswer == correctAnswer)
        {
            score++;
        }

        questionIndex++;
        if(questionIndex < maxNumOfQuestions)
        {
            nextQuestion();
        }
        else
        {
            sessionStorage.setItem("score", score);
            window.location.assign("/Bootcamp-FED-Task/results.html");
        }
    });
});