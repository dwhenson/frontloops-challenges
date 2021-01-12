const toggles = [...document.querySelectorAll(".slider")];
const list = document.querySelector("ul");

function randomBoolean() {
	return Math.random() < 0.5;
}

function clickHandler(event) {
	const uncheckedToggles = toggles.filter(
		(toggle) => toggle.index !== event.target.id
	);
	uncheckedToggles.forEach((toggle) => {
		if (randomBoolean()) {
			toggle.previousElementSibling.checked
				? toggle.previousElementSibling.removeAttribute("checked")
				: toggle.previousElementSibling.setAttribute("checked", true);
		}
	});
	console.log(uncheckedToggles, toggles);
}

list.addEventListener("click", clickHandler);
