//2.DOM elements
const resultEl=document.getElementById('result');
const legthEl=document.getElementById('length');
const uppercaseEl=document.getElementById('uppercase');
const lowercaseEl=document.getElementById('lowercase');
const numbersEl=document.getElementById('numbers');
const symbolsEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');

//3. getting result of function
const randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
};

//4. Generate  addEventListener
generateEl.addEventListener('click',()=>{
    // added + symbol to get result in number
    const length=+legthEl.value;

    //get checked property, in terms of true or false
    const hasLower=lowercaseEl.checked;
    const hasUpper=uppercaseEl.checked;
    const hasNumber=numbersEl.checked;
    const hasSymbol=symbolsEl.checked;

    //it will put the result in result element span 
   resultEl.innerText= generatePassword(hasLower, hasUpper, hasNumber, hasSymbol,length);
});

//copy password to clipboard
clipboardEl.addEventListener('click',()=>{
    //1.create element from js
    const textarea=document.createElement('textarea');
    //get the password
    const password=resultEl.innerText;

    if(!password){
        return;
    }
    //in created textarea putting the password into it
    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    //to copy the contents of the textarea to the clipboard
     document.execCommand('copy');
    
     //remove the textarea element from the document
    textarea.remove();
    window.alert('password copied to clipboard');
});


//Generate password function
function generatePassword(lower, upper,number,symbol,length){
    //1. Initialize password variable
    //2. filter out unchecked types
    //3.Loop over length call generator function for each type
    //4. add final pw to the pw var and return

    let generatedPassword='';
    //counting no of checked value
    const typesCount=lower + upper + number + symbol;

    //create arr of object
    // filter is high order arr method, loop through each item
    //based on true or false filter out any value
    const typesArr=[{lower},{upper},{number},{symbol}].filter(item =>Object.values(item)[0]);
    //item, which will be in array, first value at zero

    //for unchecked
    if(typesCount===0){
        return '';
    }
    //3.Generating different characters
for(let i=0; i<length;i+=typesCount){
    //forEach is high order array method
    typesArr.forEach(type =>{
        const funcName=Object.keys(type)[0];

        generatedPassword+=randomFunc[funcName]();
    });

}

const finalPassword=generatedPassword.slice(0, length);
return finalPassword;

} 





//Will use 4 diffent function to generate the password

//1. Generator functions
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}


function getRandomSymbol(){
    const symbols='!@#$%^&*(){}[]=<>?,.';
    return symbols[(Math.floor(Math.random()*symbols.length))];
}

