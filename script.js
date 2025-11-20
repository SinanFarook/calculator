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

// creating all buttons in the array

const createButtons = function (btnLabels) {
  for (const label of btnLabels) {
    let btn = document.createElement("button");
    btn.setAttribute(`class`, `${label.class}`);
    if (label.text[0] === "&") btn.innerHTML = label.text;
    else btn.textContent = label.text;
    // number click
    if (label.class.includes("number")) {
      btn.addEventListener("click", () => {
        currentInput += label.text;
        display.textContent += label.text;
      });
    }
    // operator click
    else if (label.class.includes("operator")) {
      btn.addEventListener("click", () => {
        let newOperator = label.class.split(" ")[0];
        // display result when num2 entered
        if (operator && currentInput) {
          num2 = currentInput;
          let result = operate(operator, num1, num2);
          display.textContent = result + " " + btn.textContent + " ";
          operator = newOperator;
          num1 = result;
        }
        // operator display
        else if (display.textContent != "") {
          if (currentInput != "") num1 = currentInput;
          // num1 then operator
          if (currentInput != "") {
            operator = newOperator;
            display.textContent += " " + btn.textContent + " ";
          }
          // multiple operators entered simultaneously overwrites old
          else if (currentInput == "") {
            // overwrites
            if (operator) {
              display.textContent =
                display.textContent.slice(0, -2) + btn.textContent + " ";
              operator = newOperator;
            }
            // operator after clicking equal
            else {
              display.textContent += " " + btn.textContent + " ";
              operator = newOperator;
            }
          }
        }
        currentInput = "";
      });
    } else if (label.class == "equal") {
      btn.addEventListener("click", () => {
        let result = operate(operator, num1, currentInput);
        display.textContent = result;
        num1 = result;
        operator = null;
        currentInput = "";
      });
    }
    btnContainer.appendChild(btn);
  }
};

/*

*/
const populateDigits = function () {};

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
