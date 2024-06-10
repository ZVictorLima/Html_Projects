/**
 * This file contains the JavaScript code for the calculator.
 * The calculator has the following features:
 * 1. It can add, subtract, multiply, and divide numbers.
 * 2. It can clear the screen.
 * 3. It can delete the last character.
 * 4. It can display the result of the calculation.
 * 5. It can display the running total of the calculation.
 * 6. (For now) only takes int values
 */
let runningTotal = 0; // This variable stores the running total of the calculator.
let buffer = "0"; // This variable stores the current input buffer.
let previousOperator; // This variable stores the previous operator used in calculations.

const screen = document.querySelector(".screen"); // This variable represents the calculator screen element.

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value); // If the value is not a number, it is treated as a symbol and passed to the handleSymbol function.
    } else {
        handleNumber(value); // If the value is a number, it is passed to the handleNumber function.
    }
    screen.innerText = buffer; // The buffer is displayed on the screen.
}

function handleSymbol(symbol) {
    switch (symbol) {
        // clear button
        case 'c':
            buffer = "0"; // If the symbol is 'c', the buffer is reset to 0.
            runningTotal = 0; // The running total is also reset to 0.
            previousOperator = null; // Reset the previous operator
            break;
        // equal button
        case '=':
            if (previousOperator == null) {
                return // If there is no previous operator, the function returns.
            }
            flushOperation(parseInt(buffer)); // The buffer is converted to an integer and passed to the flushOperation function.
            buffer = runningTotal.toString(); // The buffer is set to the running total.
            runningTotal = 0; // The running total is reset to 0.
            previousOperator = null; // Reset the previous operator
            break;
        // delete button
        case '←':
            if (buffer.length === 1) {
                buffer = "0"; // If the buffer has only one character, it is reset to 0.
            } else {
                buffer = buffer.substring(0, buffer.length - 1); // If the buffer has more than one character, the last character is removed.
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol); // If the symbol is an operator, it is passed to the handleMath function.
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return; // If the buffer is 0, the function returns.
    }
    const intBuffer = parseInt(buffer); // The buffer is converted to an integer
    if (runningTotal === 0) {
        runningTotal = intBuffer; // If the running total is 0, it is set to the buffer.
    } else {
        flushOperation(intBuffer); // If the running total is not 0, the buffer is passed to the flushOperation function.
    }
    previousOperator = symbol; // The previous operator is set to the symbol.
    buffer = '0'; // The buffer is reset to 0.
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer; // If the previous operator is '+', the buffer is added to the running total.
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer; // If the previous operator is '-', the buffer is subtracted from the running total.
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer; // If the previous operator is '×', the buffer is multiplied by the running total.
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer; // If the previous operator is '÷', the running total is divided by the buffer.
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString; // If the buffer is 0, it is set to the numberString.
    } else {
        buffer += numberString; // If the buffer is not 0, the numberString is added to the buffer.
    }
}

/**
 * Initializes the calculator.
 */
function init() {
    document.querySelector('.calculator_buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText.trim());
    });
}

init(); // The init function is called to initialize the calculator.
