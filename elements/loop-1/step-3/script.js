const toggles = [...document.querySelectorAll("input")];
const list = document.querySelector("ul");

function randomBoolean() {
	return Math.random() < 0.5;
}
//
// function clickHandler(event) {
// 	// if (!event.target.closest(".toggles")) return;
// 	const filtered = toggles.filter((item) => item.id !== event.target.id);
// 	filtered.forEach((input) => {
// 		randomBoolean() && (input.checked = !input.checked);
// 	});
// }

function clickHandler(event) {
	if (!event.target.closest(".toggles")) return;
	toggles.forEach((input) => {
		if (input === event.target) return;
		input.checked = randomBoolean();
	});
}

list.addEventListener("change", clickHandler);
