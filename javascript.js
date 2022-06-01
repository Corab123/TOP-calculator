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
    if(func==='add'){
            displayValue = add(a,b);
    } else if(func==='subtract') {
        displayValue = subtract(a,b);
    } else if(func==='multiply') {
        displayValue = multiply(a,b);
    } else {
        displayValue = divide(a,b);
    }
    display.textContent = displayValue;
    return displayValue;
}

const display = document.getElementById("calculatedValue");
const history = document.getElementById('history');
let displayValue = 0;
let numberOfOperations = 0;
let currentValue = 0;
let beginning = true;
let startOfType = true;
let lastOperand = '';
let lastOperator = '';
let historyText = '';

const digits = document.querySelectorAll(".digitButton > button");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

digits.forEach(digit => {digit.addEventListener('click', addDigit(digit))});

function addDigit(digit) {
    return function () {
        if(beginning){
            history.textContent = '';
            display.textContent = digit.textContent;
            history.textContent = '';
            beginning = false;
        } else if(startOfType){
            display.textContent = digit.textContent;
        } else {
            display.textContent+=digit.textContent;
        };
        startOfType = false;
    }
};



const operators = document.querySelectorAll(".operators > button");
operators.forEach(element => {
    element.addEventListener('click', x => {
        displayValue = parseFloat(display.textContent);
        if(beginning){
            history.textContent = '';
            display.textContent = '';
        }
        if(display.textContent==='0' && beginning){
            return;
        }
        
        historyText =  addOpeningBracket(lastOperator, numberOfOperations) + historyText +  " " + addClosingBracket(lastOperator, numberOfOperations) + lastOperand +  " " + displayValue ;

        if (numberOfOperations>=1){
            currentValue = operate(lastOperator, currentValue, displayValue)
            history.textContent = historyText + ' = ' + currentValue 
        }
        lastOperator = element.id;
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

        currentValue = displayValue;
        display.textContent = 0;
        numberOfOperations++;
        beginning = false;
        startOfType = true;   
    });
});

function addOpeningBracket(operator, number){
    if (number > 1 && (operator === 'multiply' || operator === 'divide')){
        return "("
    }
    return ""
}
function addClosingBracket(operator, number){
    if (number > 1 && (operator === 'multiply' || operator === 'divide')){
        return ")"
    }
    return ""
}

equal.addEventListener('click', runEqual);

function runEqual(){
    displayValue = parseFloat(display.textContent);
    historyText =  addOpeningBracket(lastOperator, numberOfOperations) + historyText +  " " + addClosingBracket(lastOperator, numberOfOperations) + lastOperand +  " " + displayValue ;
    if (numberOfOperations>=1){
        currentValue = operate(lastOperator, currentValue, displayValue)
        history.textContent = historyText + ' = ' + currentValue 
    }
    reset();
}
clear.addEventListener('click', runClear)

function runClear() {
    display.textContent = '';
    history.textContent='';
    reset();
};

function reset(){
    displayValue = 0;
    currentValue = 0;
    numberOfOperations=0;
    beginning = true;
    startOfType = true;
    lastOperand = '';
    lastOperator = '';
    historyText = '';
}
