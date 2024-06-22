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
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);
  switch (operator) {
  case "+":
    console.log(add(firstNumber, secondNumber));
    break;
  case "-":
    console.log(subtract(firstNumber, secondNumber));
    break;
  case "*":
    console.log(multiply(firstNumber, secondNumber));
    break;
  case "/":
    console.log(divide(firstNumber, secondNumber));
    break;
  }
}

function populateDisplay(value) {
  const display = document.querySelector("#calculator-display");
  display.textContent = value;
}

function updateNumber(value) {
  if (updatingFirstNumber === true) {
    if (firstNumber === null) {
      firstNumber = value;
    } else {
      firstNumber += value;
    }
    populateDisplay(firstNumber);
  } else {
    if (secondNumber === null) {
      secondNumber = value;
    } else {
      secondNumber += value;
    }
    populateDisplay(secondNumber);
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
let updatingFirstNumber = true;

const buttonContainer = document.querySelector("#calculator-buttons");

buttonContainer.addEventListener("click", e => {
  const button = e.target;
  const value = button.dataset.value;
  const type = button.dataset.buttonType;
  if (type === "number") {
    updateNumber(value);
  } else if (type === "operator") {
    updateOperator(value);
  } else if (type === "equals") {
    if (firstNumber !== null && secondNumber !== null) {
      operate(operator, firstNumber, secondNumber);
    }
  }
})