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

function populateDisplay(button, value) {
  const display = document.querySelector("#calculator-display");
  if (button.dataset.buttonType === "number") {
      display.textContent = value;
  };
}

let firstNumber;
let secondNumber;
let operator;
let displayValue;

const buttonContainer = document.querySelector("#calculator-buttons");

buttonContainer.addEventListener("click", e => {
  const button = e.target;
  const value = button.dataset.value
  populateDisplay(button, value);
  displayValue = value;
})