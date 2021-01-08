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
	if (indexValue > tabArray.length || isNaN(indexValue)) {
		alert(`Please select a number between 1 and ${tabArray.length}`);
		input.value = "";
		input.focus();
		return;
	}

	contentArray.forEach((section) => {
		section.removeAttribute("aria-selected");
		section.setAttribute("hidden", "true");
	});

	tabArray.forEach((tab) => {
		tab.removeAttribute("aria-selected");
	});

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
