const tabForm = document.querySelector("#tabby");
const tabArray = Array.from(document.querySelectorAll("[role=tab]"));
const content = document.querySelector("#contents");
const contentArray = Array.from(document.querySelectorAll("[role=tabpanel]"));

function clickHandler(event) {
	if (!event.target.closest("a")) return;

	// remove all aria-selected and add to clicked element
	tabArray.forEach((tab) => {
		tab.removeAttribute("aria-selected");
	});
	event.target.setAttribute("aria-selected", "true");

	// hide all sections and show/aria-select relevant section
	contentArray.forEach((section) => {
		section.removeAttribute("aria-selected");
		section.setAttribute("hidden", "true");
	});

	const section = content.querySelector(`#content-${event.target.dataset.tab}`);
	section.setAttribute("aria-selected", "true");
	section.removeAttribute("hidden");
}

tabForm.addEventListener("click", clickHandler);
