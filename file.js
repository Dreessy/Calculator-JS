const nbuttons = document.querySelectorAll("[data-nbmr]");
const opButtons = document.querySelectorAll("[data-op]");
const equalsButton = document.querySelector("[data-uguale]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = document.querySelector("[data-point]");
const screen = document.querySelector("[data-screen]");

let firstop = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

nbuttons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

opButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(n) {
  if (screen.textContent === "0" || shouldResetScreen) resetScreen();
  screen.textContent += n;
}

function resetScreen() {
  screen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  screen.textContent = "0";
  firstop = "";
  secondOperand = "";
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return;
  screen.textContent += ".";
}

function deleteNumber() {
  screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstop = screen.textContent;
  currentOperation = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && screen.textContent === "0") {
    alert("You can't divide by 0!");
    clear();
    return;
  }
  secondOperand = screen.textContent;
  screen.textContent = roundResult(
    operate(currentOperation, firstop, secondOperand)
  );
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}


function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}