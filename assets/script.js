// ! Variables

const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();


keys.addEventListener('click', function (e) {
    const element = e.target;
    const value = element.value;

    // ! Main Condition

    if (!element.matches('button')) return;

    switch (value) {

        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;

        case '.':
            inputDecimal();
            break;

        case 'clear':
            clear();
            break;

        default:
            inputNumber(value);
    }
    updateDisplay();
});

// ! Functions

function updateDisplay() {

    display.value = displayValue
};

function inputNumber(num) {

    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
};

function inputDecimal() {

    if (!displayValue.includes('.')) {
        displayValue += '.'
    }
};

function clear() {
    displayValue = '0';
}

function handleOperator(nextOperator) {

    const value = parseFloat(displayValue);

    if (firstValue === null) {
        firstValue = value
    }
    else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = String(result);
        firstValue = result;

    }
    waitingForSecondValue = true;
    operator = nextOperator;
};

function calculate(first, second, operator) {

    if (operator === '+') {
        return first + second;
    }
    else if (operator === '-') {
        return first - second;
    }
    else if (operator === '*') {
        return first * second;
    }
    else if (operator === '/') {
        return first / second;
    } else {
        return second; // it's mean equal (=)
    }
};