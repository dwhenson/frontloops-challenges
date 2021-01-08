const tabby = document.querySelector(".tabby");
const tabs = Array.from(document.querySelectorAll(".tab"));
const content = Array.from(document.querySelectorAll(".content"));

function clickHandler(event) {
	if (!event.target.closest("button")) return;
	event.preventDefault();

	tabs.forEach((tab) => {
		console.log(tab);
		tab.firstElementChild.removeAttribute("aria-selected");
	});

	event.target.setAttribute("aria-selected", "true");
}

tabby.addEventListener("click", clickHandler);
