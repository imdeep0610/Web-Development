let userScore=0;
let compScore=0;
const choices=document.querySelectorAll(".choice");
let msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");
const genCompChoice=()=>{
  const options=["rock","paper","scissor"]
 const randIdx= Math.floor(Math.random()*3); /*random() is used for generate random number , here we cant generate strings
  in random form thats why we store options in array and generate random no to use it as 
  index no 
  Math.random()*3=generate no less than 3 amd "Math.floor()" will give absolute value*/
  return options[randIdx];
};
const drawGame=()=>{
    msg.innerText="Game draw, Play again";
   msg.style.backgroundColor="black";
};

const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
      userScore++;
      userScorePara.innerText=userScore;
        msg.innerText=`You win,your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText=`You loose, ${compChoice} beats your ${userChoice} `;
        msg.style.backgroundColor="red";
    }
};

const playGame=(userChoice)=>{
    console.log("Choice was clicked",userChoice);
    const compChoice=genCompChoice();
    console.log("Comp Choice was : ",compChoice);

    if(userChoice===compChoice){
       drawGame();
    }
    else{
        let userWin=true;
        if(userChoice==="rock"){
            //option left= paper/scissor
             userWin=compChoice==="paper"?false:true;
        }
        else if(userChoice==="paper"){
             //option left=rock/scissor
             userWin=compChoice==="scissor"?false:true;
        }
        else{
            //option left=rock/paper
            userWin=compChoice==="paper"?true:false;
       }
       showWinner(userWin,userChoice,compChoice);
    }
};
   
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});