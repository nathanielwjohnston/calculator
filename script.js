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
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
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
        populateDisplay("brother", true);
        return;
      } else {
        result = divide(num1, num2);
      }
      break;
  }
  populateDisplay(result, true);
  firstNumber = result;
  secondNumber = null;
}

function populateDisplay(value, isResult) {
  value = value.toString();
  const display = document.querySelector("#calculator-display");
  if (isResult && !isNaN(value)) {
    value = parseFloat(parseFloat(value).toFixed(2));
  } else if (value.charAt(0) === ".") {
    value = "0" + value;
  }
  display.textContent = value;
}

function updateNumber(value) {
  if (updatingFirstNumber) {
    if (firstNumber === null) {
      firstNumber = value;
    } else {
      firstNumber += value;
    }
    populateDisplay(firstNumber, false);
  } else {
    if (secondNumber === null) {
      secondNumber = value;
    } else {
      secondNumber += value;
    }
    populateDisplay(secondNumber, false);
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
  populateDisplay(0, false);
}

function insertIntoCalculation(value, type) {
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
      populateDisplay(firstNumber, false);
    } else if (secondNumber !== null) {
      secondNumber = secondNumber.slice(0, (secondNumber.length - 1));
      populateDisplay(secondNumber, false);
    }
  }
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
  insertIntoCalculation(value, type);
})

document.addEventListener("keydown", e => {
  types = {
    number:["0","1","2","3","4","5","6","7","8","9","."],
    operator:["+","-","/","*"],
    equals:["=", "Enter"],
    backspace:["Backspace"]
  };
  
const key = e.key;
let type;
for (iteratedType in types) {
  if (types[iteratedType].some(value => key === value)) type = iteratedType; 
}
let value;
if (type === "backspace" || type === "equals") {
  value = type;
} else {
  value = key;
}

if (type !== undefined) {
  insertIntoCalculation(value, type);
}
})