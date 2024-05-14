const inputSlider=document.querySelector("#lengthSlider");
const lengthDisplay=document.querySelector("#lengthNumber");
const displayPassword=document.querySelector("#passwordDisplay");
const cpyBtn=document.querySelector(".copy-btn");
const cpyMsg=document.querySelector("#copyMsg");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector(".indicator");
const generateBtn=document.querySelector(".generateBtn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbol='!@$%^&*+(){}/?\[][}=(}-#'

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");

//set the password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
//97-a 123-z it gives randon no between 93-123 then String.fromCharCode() changes it into char
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    //67-A 91-Z it gives randon no between 93-123 then String.fromCharCode() changes it into char
        return String.fromCharCode(getRndInteger(67,91));
}

function generateSymbol(){
    const randNum=getRndInteger(0,symbol.length);
    return symbol.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
  try{
    //writeText return us a promise and thats why we use await so that when
    // promise(to copy the password) is comlpete, "copied" message is shown on screen
       await navigator.clipboard.writeText(displayPassword.value);
       cpyMsg.innerText='copied';
  }
  catch(e){
         cpyMsg.innerText='failed'
  }

  //to make cpy wala span visible
  cpyMsg.classList.add("active");
  setTimeout(()=>{
    cpyMsg.classList.remove("active");
  },2000);
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});
cpyBtn.addEventListener('click',()=>{
   if(passwordDisplay.value){
   copyContent();
   }
});

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach( (checkbox) => {
      if(checkbox.checked)
          checkCount++;
  });

  //special condition
  if(passwordLength < checkCount ) {
      passwordLength = checkCount;
      handleSlider();
  }
}

generateBtn.addEventListener('click',()=>{
   //none of the checkbox is selected
   if(checkCount<=0){
    return;
   }
   if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}
console.log("start the journey");
   //new password
   //remove old pass
   password="";

   //put the stuff mentioned by checkbox
//    if(uppercaseCheck.checked){
//        password+=generateUpperCase();
//    }
//    if(lowercaseCheck.checked){
//     password+=generateLowerCase();
//    }
//    if(numbersCheck.checked){
//     password+=generateRandomNumber();
// }
// if(symbolCheck.checked){
//   password+=generateSymbol();
// }

let funArr=[];
if(uppercaseCheck.checked){
    funArr.push(generateUpperCase);
}
if(lowercaseCheck.checked){
  funArr.push(generateLowerCase);
}
if(numbersCheck.checked){
  funArr.push(generateRandomNumber);
}
if(uppercaseCheck.checked){
  funArr.push(generateSymbol);
}

//compulsary addition 
 for(let i=0;i<funArr.length.length;i++){
    password+=funArr[i]();
 }

 //remaining addition
 for(let i=0;i<passwordLength-funArr.length;i++){
  let randIndex = getRndInteger(0 , funArr.length);
  console.log("randIndex" + randIndex);
  password += funArr[randIndex]();
 }

 //shuffle the password to get random pass
 password=shufflePassword(Array.from(password));

 //show in UI
 passwordDisplay.value=password;

 //strength
calcStrength();
});

function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

