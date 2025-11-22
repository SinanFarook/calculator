const btnContainer = document.querySelector("#button-container");
const display = document.querySelector("#display-container");
let num1, num2, operator;
let currentInput = "";
// dual class names
const btnLabels = [
  { class: "clear", text: "C" },
  { class: "divide operator", text: "&divide;" },
  { class: "percent operator", text: "&percnt;" },
  { class: "multiply operator", text: "&times;" },
  { class: "seven number", text: 7 },
  { class: "eight number", text: 8 },
  { class: "nine number", text: 9 },
  { class: "minus operator", text: "&minus;" },
  { class: "four number", text: 4 },
  { class: "five number", text: 5 },
  { class: "six number", text: 6 },
  { class: "plus operator", text: "&plus;" },
  { class: "one number", text: 1 },
  { class: "two number", text: 2 },
  { class: "three number", text: 3 },
  { class: "zero number", text: 0 },
  { class: "decimal", text: "." },
  { class: "sign operator", text: "&plusmn;" },
  { class: "equal", text: "&equals;" },
];

const add = function (num1, num2) {
  return parseInt(num1) + parseInt(num2);
};

const subtract = function (num1, num2) {
  return parseInt(num1) - parseInt(num2);
};

const multiply = function (num1, num2) {
  return parseInt(num1) * parseInt(num2);
};

const divide = function (num1, num2) {
  return parseInt(num1) / parseInt(num2);
};

// create all buttons in array

const createButtons = function (btnLabels) {
  for (const label of btnLabels) {
    let btn = document.createElement("button");
    btn.className = label.class;

    // Handle Button Text Rendering
    if (label.text[0] === "&") btn.innerHTML = label.text;
    else btn.textContent = label.text;

    // Add Event Listeners
    if (label.class.includes("number")) {
      btn.addEventListener("click", () => handleNumber(label.text));
    } else if (label.class.includes("operator")) {
      btn.addEventListener("click", () =>
        handleOperator(label.class, btn.textContent)
      );
    } else if (label.class.includes("equal")) {
      btn.addEventListener("click", () => handleEqual());
    } else if (label.class.includes("clear")) {
      btn.addEventListener("click", () => handleClear);
    }

    btnContainer.appendChild(btn);
  }
};

// Handler Functions

const handleNumber = function (value) {
  currentInput += value;
  display.textContent += value;
};

const handleOperator = function (opClass, opSymbol) {
  // GUARD CLAUSE: Don't allow operator at start
  if (display.textContent === "") return;
  const newOperator = opClass.split(" ")[0];
  // Scenario: Chaining (1+2-...)
  if (operator && currentInput) {
    num2 = currentInput;
    const result = operate(operator, num1, num2);
    display.textContent = result + " " + opSymbol + " ";
    operator = newOperator;
    num1 = result;
  }
  // Scenario: Overwriting Operator
  else if (currentInput === "" && operator) {
    display.textContent = display.textContent.slice(0, -2) + opSymbol + " ";
    operator = newOperator;
  }
  // Scenario: Operator after Equals
  else if (currentInput === "" && !operator) {
    display.textContent += " " + opSymbol + " ";
    operator = newOperator;
  }
  // Standard (12 +)
  else {
    num1 = currentInput;
    operator = newOperator;
    display.textContent += " " + opSymbol + " ";
  }
  // When operator clicked no number as input
  currentInput = "";
};

const handleEqual = function () {
  // GUARD CLAUSE: Don't run if no expression
  if (!currentInput || !operator) return;
  const result = operate(operator, num1, currentInput);
  display.textContent = result;
  num1 = result;
  operator = null;
  currentInput = "";
};

const operate = function (operator, num1, num2) {
  switch (operator) {
    case "plus":
      return add(num1, num2);
    case "minus":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      return divide(num1, num2);
    default:
      return null;
  }
};

console.log(add(1, 1));
console.log(subtract(1, 1));
console.log(multiply(1, 1));
console.log(divide(1, 1));

createButtons(btnLabels);
