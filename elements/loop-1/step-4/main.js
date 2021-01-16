const links = [...document.querySelectorAll(".progress a")];
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const instruction = document.querySelector("#instruction");
let stage = 0;

function renderHTML() {
	if (stage === 0) instruction.textContent = `Please enter a title`;
	if (stage === 1) instruction.textContent = `Please choose a description`;
	if (stage === 2) instruction.textContent = `Please confirm you are happy`;
}

function activateLink(element) {
	links.forEach((link) => link.classList.remove("active"));
	element.classList.add("active");
	if (!element.hasAttribute("data-complete")) {
		element.setAttribute("data-complete", "");
	}
	renderHTML();
}

function buttonHandler(event) {
	event.preventDefault();
	if (event.target === next && stage < links.length - 1) stage += 1;
	if (event.target === previous && stage > 0) stage -= 1;

	links.forEach((link, index) => {
		if (index === stage) {
			activateLink(link);
		}
	});
}

function progressHandler(event) {
	links.forEach((link, index) => {
		if (
			link === event.target &&
			(index === 0 || links[index - 1].hasAttribute("data-complete"))
		) {
			stage = index;
			activateLink(event.target);
		}
	});
}

function clickHandler(event) {
	if (event.target.tagName === "A") progressHandler(event);
	if (event.target.tagName === "BUTTON") buttonHandler(event);
}

document.addEventListener("click", clickHandler);
