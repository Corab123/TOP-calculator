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
    return func(a,b);
}

const display = document.querySelector(".output");
let displayValue = parseFloat(display.textContent);

const digits = document.querySelectorAll(".digits > button");

digits.forEach(element => {
    element.addEventListener('click', a => { 
        display.textContent+=element.textContent
    })
});


console.log(displayValue);