/* =================== Variables ====================== */
/* ==================================================== */

const tabArray = Array.from(document.querySelectorAll("[role=tab]"));
const content = document.querySelector("#contents");
const contentArray = Array.from(document.querySelectorAll("[role=tabpanel]"));
const input = document.querySelector("#tab-index");

/* =================== Functions ====================== */
/* ==================================================== */
// CHECK can these be updated to be more flexable and take single values?
function removeSelected(elements) {
	elements.forEach((element) => {
		element.removeAttribute("aria-selected");
	});
}

function removeAttribute(elements, attribute) {
	elements.forEach((element) => {
		element.removeAttribute(attribute);
	});
}

function setHidden(elements) {
	elements.forEach((element) => {
		element.setAttribute("hidden", "true");
	});
}

function setAttribute(elements, attribute) {
	elements.forEach((element) => {
		element.setAttribute(attribute, "true");
	});
}

function tabChangeSections(event) {
	if (!event.target.closest("a")) return;

	// remove aria-selected from tabs and set on selected
	removeAttribute(tabArray, "aria-selected");
	setAttribute(contentArray, "hidden");

	// add aria-selected to selected tab
	event.target.setAttribute("aria-selected", "true");
	// add aria-selected to associated section and remove hidden attribute
	const section = content.querySelectorAll(`#content-${event.target.dataset.tab}`);
	setAttribute(section, "aria-selected");
	removeAttribute(section, "hidden");
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

	// remove aria-selected from sections, tabs and add hidden attribute to sections
	removeSelected(tabArray);
	removeSelected(tabArray);
	setHidden(contentArray);

	// set aria-selected and remove hidden attributes from selected tabs and sections
	// CHECK possibility of refactoring with a setAttribute function?
	contentArray[indexValue].setAttribute("aria-selected", "true");
	contentArray[indexValue].removeAttribute("hidden");
	tabArray[indexValue].setAttribute("aria-selected", "true");
	tabArray[indexValue].removeAttribute("hidden");
}

function clickHandler(event) {
	indexChangeSections(event);
	tabChangeSections(event);
}

/* =============  Inits and Event Listener  =========== */
/* ==================================================== */

document.addEventListener("click", clickHandler);
