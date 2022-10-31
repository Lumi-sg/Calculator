const numberButtons = document.querySelectorAll("[calc-number]");
const operationButtons = document.querySelectorAll("[calc-operation]");
const clearButton = document.querySelector("[calc-clear]");
const deleteButton = document.querySelector("[calc-delete]");
const equalsButton = document.querySelector("[calc-equals]");
const decimalButton = document.querySelector("[calc-decimal]");
const topText = document.querySelector("[calc-userText]");
const botText = document.querySelector("[calc-calcOutput]");

let firstOperation = "";
let secondOperation = "";
let currentOperation = null;
let reset = false;

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteLastNumber);
equalsButton.addEventListener("click", myEvaluate);
decimalButton.addEventListener("click", addDecimal);
window.addEventListener("keydown", keyboartSupport);

numberButtons.forEach((button) =>
	button.addEventListener("click", () => addNumToDisplay(button.textContent))
);

operationButtons.forEach((button) =>
	button.addEventListener("click", () => setTheOperator(button.textContent))
);

function addNumToDisplay(number) {
	if (botText.textContent === "0" || reset) {
		resetDisplay();
	}
	botText.textContent += number;
}

function clear() {
	botText.textContent = "0";
	topText.textContent = "";
	firstOperation = "";
	secondOperation = "";
	currentOperation = null;
}

function resetDisplay() {
	botText.textContent = "";
	reset = false;
}

function deleteLastNumber() {
	botText.textContent = botText.textContent.toString().slice(0, -1);
}

function setTheOperator(operator) {
	if (botText.textContent !== "null") {
		myEvaluate();
	}
	firstOperation = botText.textContent;
	currentOperation = operator;
	if (botText.textContent === "") {
		clear();
		return;
	}
	topText.textContent = `${firstOperation} ${currentOperation}`;
	reset = true;
}

function myEvaluate() {
	if (currentOperation === null || reset) {
		return;
	}
	if (currentOperation === "÷" && botText.textContent === "0") {
		alert("You can't divide by 0!");
		botText.textContent = "";
		return;
	}
	secondOperation = botText.textContent;
	botText.textContent = quickMaths(
		currentOperation,
		firstOperation,
		secondOperation
	);
	topText.textContent = `${firstOperation} ${currentOperation} ${secondOperation} =`;
	currentOperation = null;
}
function quickMaths(operation, a, b) {
	a = parseFloat(a);
	b = parseFloat(b);
	switch (operation) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "x":
			return a * b;
		case "÷":
			if (b === 0) {
				return null;
			} else {
				return a / b;
			}
		default:
			return null;
	}
}

function addDecimal() {
	if (reset) {
		resetScreen();
	}
	if (botText.textContent === "") {
		botText.textContent = "0";
	}
	if (botText.textContent.includes(".")) {
		return;
	}
	botText.textContent += ".";
}

function keyboartSupport(event) {
	if (event.key !== " ") {
		if (event.key >= 0 && event.key <= 9) {
			console.log(event.key);
			addNumToDisplay(event.key);
		}
		if (event.key === "+" || event.key === "-") {
			setTheOperator(event.key);
		}
		if (event.key === "*") {
			setTheOperator("x");
		}
		if (event.key === "/") {
			setTheOperator("÷");
		}
		if (event.key === ".") {
			addDecimal();
		}
		if (event.key === "=" || event.key === "Enter") {
			myEvaluate();
		}
		if (event.key === "Backspace") {
			deleteLastNumber();
		}
		if (event.key === "Escape") {
			clear();
		}
	}
}
