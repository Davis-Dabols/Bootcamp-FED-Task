const score = sessionStorage.getItem("score");
const maxNumOfQuestions = sessionStorage.getItem("maxNumOfQuestions");

let resultElement = document.getElementById("result");

resultElement.innerText = "Congratulations, you answered " + score + '/' + maxNumOfQuestions + " questions correctly!";