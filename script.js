function add(a,b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  return a / b;
}

// calls an operator function based on input
function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
  case "+":
    add(firstNumber, secondNumber);
    break;
  case "-":
    subtract(firstNumber, secondNumber);
    break;
  case "*":
    multiply(firstNumber, secondNumber);
    break;
  case "/":
    divide(firstNumber, secondNumber);
    break;
  }
}

function populateDisplay(value) {
  const display = document.querySelector("#calculator-display");
  display.textContent = value;
  displayValue = value;
}

function updateNumber(value) {
  if (updatingFirstNumber === true) {
    if (firstNumber === null) {
      firstNumber = value;
    } else {
      firstNumber += value;
    }
  } else {
    if (secondNumber === null) {
      secondNumber = value;
    } else {
      secondNumber += value;
    }
  }
}

function updateOperator(value) {
  if (updatingFirstNumber === true) {
      updatingFirstNumber = false;  
  }
  operator = value;
}

let firstNumber = null;
let secondNumber = null;
let operator;
let displayValue;
let updatingFirstNumber = true;

const buttonContainer = document.querySelector("#calculator-buttons");

buttonContainer.addEventListener("click", e => {
  const button = e.target;
  const value = button.dataset.value
  if (button.dataset.buttonType === "number") {
    populateDisplay(value);
    updateNumber(value);
  } else if (button.dataset.buttonType === "operator") {
    updateOperator(value);
  }
})