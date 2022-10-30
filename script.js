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

numberButtons.forEach((button) =>
	button.addEventListener("click", () => addNumToDisplay(button.textContent))
);

operationButtons.forEach((button) =>
	button.addEventListener("click", () => setTheOperator(button.textContent))
);

function resetDisplay() {
	botText.textContent = "";
	reset = false;
}

function addNumToDisplay(number) {
	if (botText.textContent === "" || reset) {
		resetDisplay();
	}
	botText.textContent += number;
}

function clear() {
	botText.textContent = "";
	topText.textContent = "";
	firstOperation = "";
	secondOperation = "";
	currentOperation = null;
}

function addDecimal() {
	if (reset) resetScreen();
	if (botText.textContent === "") botText.textContent = "0";
	if (botText.textContent.includes(".")) return;
	botText.textContent += ".";
}

function deleteLastNumber() {
	botText.textContent = botText.textContent.toString().slice(0, -1);
}

function setTheOperator(operator) {
	if (botText.textContent !== null) {
		myEvaluate();
	}
	firstOperation = botText.textContent;
	currentOperation = operator;
	topText.textContent = `${firstOperation} ${currentOperation}`;
	reset = true;
}

function myEvaluate() {
	if (currentOperation === null || reset === true) {
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
			return a / b;
		default:
			return null;
	}
}
