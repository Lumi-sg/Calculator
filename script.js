const numberButtons = document.querySelectorAll("[calc-number]");
const operationButtons = document.querySelectorAll("[calc-operation]");
const clearButtton = document.querySelector("[calc-clear]");
const deleteButton = document.querySelector("[calc-delete]");
const equalsButton = document.querySelector("[calc-equals]");
const topText = document.querySelector("[calc-userText]");
const botText = document.querySelector("[calc-calcOutput]");

numberButtons.forEach((button) => {
	button.addEventListener("click", function () {
		topText.textContent += button.textContent;
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", function () {
		topText.textContent += ` ${button.textContent} `;
	});
});

clearButtton.addEventListener("click", function () {
	topText.textContent = "";
	botText.textContent = "";
});
