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

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteLastNumber);
decimalButton.addEventListener("click", addDecimal);

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
	currentOperation = NaN;
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
