const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');



//MAKE AN ARRAY OF OBJECTS THAT CTORES QUE, CHOICES OF QUESTION AND ANSWER
const quiz = [
    {
        question: "What is my name?",
        choices: [ "Vishu", "Aayush", "Seeya", "Anvi"],
        answer: "Vishu"
    },

    {
        question: "What is the name of my College?",
        choices: [ "IIIT", "IIT", "NIT", "Backchodi"],
        answer: "Backchodi"
    },
    
    {
        question: "What place I love the most?",
        choices: [ "Surat", "Home", "Nagpur", "Nature"],
        answer: "Nature"
    },
    
    {
        question: "Which pet I want in my future?",
        choices: [ "Cat", "Dog", "Rabbit", "Hamster"],
        answer: "Dog"
    }
      
];


//making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
//Arrow Function to show questions
const showQuestions = ()=>{
    //console.log("Question");
    const questionDetials = quiz[currentQuestionIndex];
    questionBox.textContent= questionDetials.question;
    //console.log(quesstionDetials);

    choicesBox.textContent= "";
    //traversing through choices to display those choices
    for(let i =0; i<questionDetials.choices.length; i++){
        const currentChoice = questionDetials.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });


    }

    if(currentQuestionIndex < quiz.length){
        startTimer(); 
    }


}

//Function to check Answers
const checkAnswer = () =>{
    const selectedChoice = document.querySelector('.choice.selected');
if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
    
    displayAlert("Correct Answer");
    score++;
}
else{
    // alert("Wrong Answer");
    displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
}
timeLeft = 15;
currentQuestionIndex++; 
if(currentQuestionIndex < quiz.length){
    
    showQuestions();
}
else{ 
    showScore();
    stopTimer();
}
}
  
//Function to show score
const showScore = ()=>{
    questionBox.textContent= "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You Have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
    // nextBtn.addEventListener('click', ()=>{
    //     currentQuestionIndex = 0;
    //     showQuestions();
    //     nextBtn.textContent = "Next";
    //     scoreCard.textContent = "";
    // });
}

//Function to show alert
const displayAlert = (msg)=>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
    
}

//Fuction to start timer
const startTimer = ()=>{
    clearInterval(timerID); // check if any exixsting timer
    timer.textContent = timeLeft;

    const countDown = ()=>{
       timer.textContent = timeLeft;
        timeLeft--; 
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up !!! Do You want to play the quiz again? ");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none"
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}  
//Funtion to stop timer
const stopTimer = ()=>{
    clearInterval(timerID);
}


//Function to Shuffle question
const shuffleQuestions = ()=>{
    for(let i = quiz.length; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] == [quiz[j], quiz[i]];
        
    }
    currentQuestionIndex = 0;
    showQuestions();
}


//fucnction to start quiz
const startQuiz = ()=>{
    timer.style.display = "flex";
    timeLeft = 15;  
    shuffleQuestions();
}

//adding event listener to start button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});


nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        //alert("Select Your Answer");
        displayAlert("Select Your Answer");
        return;
    }
    if(quizOver){
        
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex =0;
        quizOver = false;
        score =0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
    
})





  