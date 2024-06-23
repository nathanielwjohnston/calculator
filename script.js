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
function operate(operator, num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      if (num2 === 0) {
        populateDisplay("brother");
        return;
      } else {
        result = divide(num1, num2);
      }
      break;
  }
  populateDisplay(result);
  firstNumber = result;
  secondNumber = null;
}

function populateDisplay(value) {
  const display = document.querySelector("#calculator-display");
  if (isNaN(value)) {
    display.textContent = value;
  } else {
    display.textContent = Math.round(value * 10) / 10;
  }
}

function updateNumber(value) {
  if (updatingFirstNumber) {
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
  if (updatingFirstNumber) {
      updatingFirstNumber = false;  
  }
  operator = value;
}

function clearCalculator() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  updatingFirstNumber = true;
  populateDisplay(0);
}

let firstNumber = null;
let secondNumber = null;
let operator = null;
let updatingFirstNumber = true;

const buttonContainer = document.querySelector("#calculator-buttons");

buttonContainer.addEventListener("click", e => {
  const button = e.target;
  const value = button.dataset.value;
  const type = button.dataset.buttonType;
  if (type === "number") {
    // Check to prevent adding onto the end of a result after pressing equals
    if (operator === null && updatingFirstNumber === false) {
      firstNumber = null;
      updatingFirstNumber = true;
    }
    updateNumber(value);
  } else if (type === "operator") {
    if (firstNumber !== null && secondNumber !== null) {
      operate(operator, firstNumber, secondNumber);
    }
    updateOperator(value);
  } else if (type === "equals") {
    if (firstNumber !== null && secondNumber !== null) {
      operate(operator, firstNumber, secondNumber);
      // Prevents reusing the same operator from the last operation if a number
      // is pressed directly after equals
      operator = null;
    }
  } else if (type === "clear") {
    clearCalculator();
  } else if (type === "backspace") {
    if (updatingFirstNumber && firstNumber !== null) {
      firstNumber = firstNumber.slice(0, (firstNumber.length - 1));
      populateDisplay(firstNumber);
    } else if (secondNumber !== null) {
      secondNumber = secondNumber.slice(0, (secondNumber.length - 1));
      populateDisplay(secondNumber);
    }
  }
})