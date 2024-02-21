function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(first, operator, last) {
    if (operator === '+') {
        return add(first, last);
    }
    else if (operator === '-') {
        return subtract(first, last);
    }
    else if (operator === '×' || operator === 'x') {
        return multiply(first, last);
    }
    else if (operator === '÷' || operator === '/') {
        return divide(first, last);
    }
}

function rounded(num) {
    return Math.round(num * 1000) / 1000;
}

function divideByZero(num, operator) {
    return num === 0 && operator === '÷' ? true : false;
}

function operation(key) {
    if (!equationValue) {
        equationValue = key;
    }
    else {
        if (equationValue != 0) {
            equationValue += key;
        }
    }
    equation.textContent = equationValue;
}

function clear() {
    equationValue = 0;
    equation.textContent = 0;
    outputValue = 0;
    output.textContent = '';
    total = 0;
}

function Delete() {
    if (equationValue !== '') {
        equationValue = equationValue.slice(0, -1);
        equation.textContent = equationValue;
    }
}

function operatorFunction(key) {
    if (!first) {
        first = equationValue;
        operator = key;
    }
    else {
        last = equationValue;
        if (divideByZero(Number(last), operator)) {
            first = 0;
            total = 0;
            output.textContent = 'Cannot divide by zero';
            return;
        }
        if (!total) {
            total = operate(Number(first), operator, Number(last));
        }
        else {
            total = operate(total, operator, Number(last));
        }
        total = rounded(total);
    }
    equationValue = 0;
    equation.textContent = total;
    operator = key;
}

function equals() {
    last = equationValue;
    if (first && last) {
        if (divideByZero(Number(last), operator)) {
            output.textContent = 'Cannot divide by zero';
            return;
        }
        if (!total) {
            outputValue = operate(Number(first), operator, Number(last));
        }
        else {
            outputValue = operate(total, operator, Number(last));
        }
        outputValue = rounded(outputValue);
        output.textContent = outputValue;
        first = 0;
        last = 0;
        total = 0;
    }
}

function decimal() {
    if (!equationValue.includes('.')) {
        equationValue += decimalKey.textContent;
        equation.textContent = equationValue;
    }
}

function keyboard(e) {
    if (e.key >= 0) {
        operation(e.key);
    }
    else if (e.key === 'Escape') {
        clear();
    }
    else if (e.key === 'Delete' || e.key === 'Backspace') {
        Delete();
    }
    else if (operators.has(e.key)) {
        operatorFunction(e.key);
    }
    else if (e.key === '=' || e.key === 'Enter') {
        equals();
    }
    else if (e.key === '.') {
        decimal();
    }
}

let first;
let operator;
let last;
let equationValue = 0;
let total = 0;
const operators = new Set(['+','-','×','÷','x','/']);

const keys = Array.from(document.querySelectorAll('button'));
const numberKeys = keys.filter((item) => Number.isInteger(Number(item.textContent)));
const operatorKeys = keys.filter((item) => operators.has(item.textContent));
const clearKey = keys.find((item) => item.textContent === 'clear');
const deleteKey = keys.find((item) => item.textContent === 'delete');
const equalKey = keys.find((item) => item.textContent === '=');
const decimalKey = keys.find((item) => item.textContent === '.');

const equation = document.querySelector('.equation');
const output = document.querySelector('.output');

const body = document.querySelector('body');

body.addEventListener('keydown', keyboard);

numberKeys.forEach((item) => item.addEventListener('click', () => operation(item.textContent)));

clearKey.addEventListener('click', () => clear());

deleteKey.addEventListener('click', () => Delete());

operatorKeys.map((item) => item.addEventListener('click', () => operatorFunction(item.textContent)));

equalKey.addEventListener('click', () => equals());

decimalKey.addEventListener('click', () => decimal());