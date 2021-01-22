// Create a string of text that simulates auto-type effect.
// After each word is typed - there should be a pause, before starting typing the next one.
// All the words variants should be set in the javascript code.

const words = ["design", "development", "frontend", "backend"];
const placeholder = document.querySelector("#typer");

function wait(ms = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateText() {
	for (const word of words) {
		placeholder.textContent = "";
		const letters = [...word];
		for (const letter of letters) {
			placeholder.textContent += letter;
			await wait(20);
		}
		await wait(word.length * 10);
	}
}

updateText();
