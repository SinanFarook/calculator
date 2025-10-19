const btnContainer = document.querySelector("#button-container");
const display = document.querySelector("#display-container");
let num1, num2, operator;
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
  { class: "equal operator", text: "&equals;" },
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
    if (label.class.includes("number")) {
      btn.addEventListener("click", () => (display.textContent += label.text));
    } else if (label.class.includes("operator")) {
      btn.addEventListener("click", () => {
        num1 = display.textContent;
        operator = label.class.split(" ")[0];
        // num1 & operator in display
        display.textContent += " " + btn.textContent + " ";
      });
    }
    btnContainer.appendChild(btn);
  }
};

/* I have buttons now. I need to make them function when clicking
 1) the first num has to be displayed when num buttons are pressed. Has to keep on appending to the num1 value until an
 operator is clicked.
  ```
  btn.addEventListener("click", ()=>{})
  ```

 2) when operator is clicked, the operator has to be stored and displayed along with num1
 3) Now it has to take num2 but only when num1 is already taken, so check if num1 is notempty and only then take num2
 4) when operator is clicked again (check if operator is empty), the operate function has to be called on num1, op, num2. The result has to be stored in 
 num1, new operator in operator and num2 has to be null. num1 along with the operator has to be displayed.
 5) when equal operator is pressed, same as step 4 except only display the final result or num1.

*/
const populateDigits = function () {};

const operate = function (operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
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
