/*
TO DO:

- Handle after Equal case for Percent
- Entering a number after equals does not append but starts a fresh calculation with that number as num1
- Add Delete/backspace button

*/

const btnContainer = document.querySelector("#button-container");
const display = document.querySelector("#display-container");
let num1, operator;
let currentInput = "";
// dual class names
const btnLabels = [
  { class: "clear", text: "C" },
  { class: "divide operator", text: "&divide;" },
  { class: "percent", text: "&percnt;" },
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
  { class: "decimal number", text: "." },
  { class: "sign operator", text: "&plusmn;" },
  { class: "equal", text: "&equals;" },
];

const add = function (num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
};

const subtract = function (num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
};

const multiply = function (num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
};

const divide = function (num1, num2) {
  if (parseFloat(num2) === 0) {
    return "Can't Break Me";
  }
  return parseFloat(num1) / parseFloat(num2);
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
      btn.addEventListener("click", () => handleClear());
    } else if (label.class.includes("percent")) {
      btn.addEventListener("click", () => handlePercent());
    }

    btnContainer.appendChild(btn);
  }
};

// Handler Functions

const handleNumber = function (value) {
  // handle multiple decimal points
  if (value === "." && currentInput.includes(".")) return;
  currentInput += value;
  if (display.textContent === "Can't Break Me") {
    display.textContent = value;
    return;
  }
  display.textContent += value;
};

const handleOperator = function (opClass, opSymbol) {
  // GUARD CLAUSE: Don't allow operator at start
  if (display.textContent === "" || display.textContent === "Can't Break Me")
    return;
  const newOperator = opClass.split(" ")[0];
  // Scenario: Chaining (1+2-...)
  if (operator && currentInput) {
    const result = operate(operator, num1, currentInput);
    if (result === "Can't Break Me") {
      display.textContent = result;
      operator = null;
      num1 = null;
      currentInput = "";
      return;
    }
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

const handlePercent = function () {
  // GUARD CLAUSE: Don't allow operator at start
  if (display.textContent === "" || display.textContent === "Can't Break Me")
    return;
  // After clicking Equals
  if (currentInput === "" && !operator) currentInput = num1;

  const percentRes = divide(currentInput, 100);
  // Scenario: chaining
  if (currentInput && operator) {
    display.textContent =
      display.textContent.slice(0, -currentInput.length) + percentRes;
  }
  // Scenario: single number
  else {
    display.textContent = percentRes;
  }
  currentInput = percentRes.toString();
};

const handleClear = function () {
  display.textContent = "";
  num1 = null;
  currentInput = "";
  operator = null;
};

const operate = function (operator, num1, num2) {
  switch (operator) {
    case "plus":
      return roundResult(add(num1, num2));
    case "minus":
      return roundResult(subtract(num1, num2));
    case "multiply":
      return roundResult(multiply(num1, num2));
    case "divide":
      return roundResult(divide(num1, num2));
    default:
      return null;
  }
};

// Helper Functions

const roundResult = function (result) {
  // upto 3 places
  return Math.round(result * 1000) / 1000;
};

console.log(add(1, 1));
console.log(subtract(1, 1));
console.log(multiply(1, 1));
console.log(divide(1, 1));

createButtons(btnLabels);
