

// Select DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Initialize variables
let currentInput = '';
let operator = null;
let previousInput = '';

// Function to update the display
function updateDisplay() {
    if (currentInput === '' && previousInput === '') {
        display.textContent = '0';
    } else if (operator && currentInput === '') {
        display.textContent = `${previousInput} ${operator}`;
    } else if (operator) {
        display.textContent = `${previousInput} ${operator} ${currentInput}`;
    } else {
        display.textContent = currentInput;
    }
}

// Function to handle number and decimal input
function handleNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
    if (currentInput.length >= 12) return; // Limit input length
    currentInput += number;
    updateDisplay();
}

// Function to handle operator input
function handleOperator(op) {
    if (currentInput === '' && previousInput === '') return; // Do nothing if no input
    if (operator !== null && currentInput === '') {
        // Change operator if no new number is entered
        operator = op;
        updateDisplay();
        return;
    }
    if (operator !== null) {
        calculate();
    }
    operator = op;
    previousInput = currentInput || previousInput;
    currentInput = '';
    updateDisplay();
}

// Function to calculate the result
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Function to reset the calculator
function resetCalculator() {
    currentInput = '';
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.dataset.number;
        const op = button.dataset.operator;
        const isClear = button.classList.contains('clear');
        const isEquals = button.classList.contains('equals');

        if (number !== undefined) {
            handleNumber(number);
        }

        if (op !== undefined) {
            handleOperator(op);
        }

        if (isClear) {
            resetCalculator();
        }

        if (isEquals) {
            calculate();
        }
    });
});

// Initialize the display
updateDisplay();

