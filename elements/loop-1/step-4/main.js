const links = [...document.querySelectorAll(".progress a")];
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const instruction = document.querySelector("#instruction");
const inputArea = document.querySelector("textarea");
const confirm = document.querySelector(".confirm");
let userData;
let stage = 0;

function renderHTML() {
	inputArea.value = "";
	if (stage === 0) {
		instruction.textContent = `Please enter a title`;
		if (userData.title) inputArea.value = userData.title;
	}
	if (stage === 1) {
		instruction.textContent = `Please choose a description`;
		if (userData.description) inputArea.value = userData.description;
	}
	if (stage === 2) {
		instruction.textContent = `Please confirm you are happy`;
		if (userData.title && userData.description)
			confirm.innerHTML = `
			<p>Title: ${userData.title}</p>
			<p>Description: ${userData.description}</p>
		`;
	}
}

function storeData() {
	userData = sessionStorage.getItem("storedData")
		? JSON.parse(sessionStorage.getItem("storedData"))
		: {};

	if (!inputArea.value) return;
	if (stage === 1) {
		userData.title = inputArea.value;
	}
	if (stage === 2) {
		userData.description = inputArea.value;
	}

	const userDataString = JSON.stringify(userData);
	sessionStorage.setItem("storedData", userDataString);
}

function activateLink(element) {
	links.forEach((link, index) => {
		if (index > stage) {
			link.classList.remove("active");
		} else {
			link.classList.add("active");
		}
	});

	element.classList.add("active");
	if (!element.hasAttribute("data-complete")) {
		element.setAttribute("data-complete", "");
	}

	storeData();
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
			activateLink(link);
		}
	});
}

function clickHandler(event) {
	if (event.target.tagName === "A") progressHandler(event);
	if (event.target.tagName === "BUTTON") buttonHandler(event);
}

document.addEventListener("click", clickHandler);
