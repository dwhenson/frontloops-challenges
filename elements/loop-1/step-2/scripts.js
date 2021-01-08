const tabArray = Array.from(document.querySelectorAll("[role=tab]"));
const content = document.querySelector("#contents");
const contentArray = Array.from(document.querySelectorAll("[role=tabpanel]"));
const input = document.querySelector("#tab-index");

function tabChangeSections(event) {
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

function indexChangeSections(event) {
	event.preventDefault();
	if (!event.target.closest("button")) return;
	const indexValue = input.value - 1;

	// if the number or value is invalid throw an error
	if (indexValue > tabArray.length || isNaN(indexValue)) {
		alert(`Please select a number between 1 and ${tabArray.length}`);
		input.value = "";
		input.focus();
		return;
	}

	// TODO refactor code to remove duplication

	// remove aria-selected from sections and hidden attribute
	contentArray.forEach((section) => {
		section.removeAttribute("aria-selected");
		section.setAttribute("hidden", "true");
	});

	// remove aria-selected from tabs
	tabArray.forEach((tab) => {
		tab.removeAttribute("aria-selected");
	});

	// set aria-selected and remove hidden attributes from selected tabs and sections
	contentArray[indexValue].setAttribute("aria-selected", "true");
	contentArray[indexValue].removeAttribute("hidden");
	tabArray[indexValue].setAttribute("aria-selected", "true");
	tabArray[indexValue].removeAttribute("hidden");
}

function clickHandler(event) {
	indexChangeSections(event);
	tabChangeSections(event);
}

document.addEventListener("click", clickHandler);
