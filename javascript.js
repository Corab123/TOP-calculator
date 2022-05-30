function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b===0){
        return "Error"
    }
    return a/b;
}

function operate(func, a,b){
    displayValue = window[func](a,b);
    display.textContent = displayValue;
    return displayValue;
}

const display = document.getElementById("calculatedValue");
const history = document.getElementById('history');
let displayValue = 0;
let numberOfOperations = 0;


const digits = document.querySelectorAll(".digitButton > button");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

digits.forEach(digit => {digit.addEventListener('click', addDigit(digit))});

function addDigit(digit) {
    return function () {
        if(display.textContent==='0'){
        display.textContent = digit.textContent;
        } else {
        display.textContent+=digit.textContent;
        };
    }
};

clear.addEventListener('click', clear => {
    displayValue = 0;
    numberOfOperations=0;
    display.textContent = '';
    history.textContent='';
});

const operators = document.querySelectorAll(".operators > button");
operators.forEach(element => {
    element.addEventListener('click', x => {
        if(display.textContent==='0'){
            return;
        }
        displayValue = parseFloat(display.textContent);
            numberOfOperations++;
            
            switch(element.id){
                case 'add':
                    lastOperand = "+";
                    break;
                case 'subtract': 
                    lastOperand = "-";
                    break;                
                case 'multiply': 
                    lastOperand = "*";
                    break;
                case 'divide': 
                    lastOperand = "/";
                    break;  
            };
            history.textContent += " " + displayValue + " " + lastOperand;
            display.textContent = 0;   
    });
});


function naturalSplit(str){
    let arr =[];
    let split = str.split(/(\d+)/);
    for(let i in split){
        let s = split[i];
        if(s!== "") {
            arr.push(s);
        }
    }
    return arr;
}
equal.addEventListener('click', runEqual);

function runEqual(){
    history.textContent += " " +display.textContent + " =";
    let myArray = naturalSplit(history.textContent);
    console.log(myArray);
    evaluate(myArray);
}

function evaluate(myArray){
    len = myArray.length;
    let calculation=0;
    let a = 0;
    let b = 0;
    let operand = '';

    for(let i=1;i<len-1;i++){
        if(i===1){
            a = parseFloat(myArray[i]);
        }
        if(isNaN(parseFloat(myArray[i]))){
            if(myArray[i]===' + '){
                operand = 'add';
            } else if(myArray[i]===' - '){
                operand = 'subtract';
            } else if(myArray[i]===' * '){
                operand = 'multiply';
            } else {
                operand = 'divide';
            }
        }else {
            b = parseFloat(myArray[i]);
        }
        if(i>2 && i%2===1){
            calculation = operate(operand,a,b);
            console.log(calculation);
            a = calculation;
        }
    }
    numberOfOperations = 0
}
