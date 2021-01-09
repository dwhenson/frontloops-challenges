/* =================== Variables ====================== */
/* ==================================================== */

const tabArray = Array.from(document.querySelectorAll("[role=tab]"));
const content = document.querySelector("#contents");
const contentArray = Array.from(document.querySelectorAll("[role=tabpanel]"));
const input = document.querySelector("#tab-index");

/* =================== Functions ====================== */
/* ==================================================== */

/* Helper Functions
/* ==================================================== */

/**
 * Removes an attribute on an array
 * @param   {array}  elements   An array of elements
 * @param   {string}  attribute  The attribute to remove
 */
function removeAttribute(elements, attribute) {
	elements.forEach((element) => {
		element.removeAttribute(attribute);
	});
}

/**
 * Sets an attribute on an array
 * @param   {array}  elements   An array of elements
 * @param   {string}  attribute  The attribute to set
 */
function setAttribute(elements, attribute) {
	elements.forEach((element) => {
		element.setAttribute(attribute, "true");
	});
}

/* Main App Functions
/* ==================================================== */

/**
 * Shows clicked tab and associated content
 * @param   {object}  event  The event object
 */
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

/**
 * Change section content based on index
 * @param   {object}  event  The event object
 */
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
	removeAttribute(tabArray, "aria-selected");
	setAttribute(contentArray, "hidden");

	// set aria-selected and remove hidden attributes from selected tabs and sections
	contentArray[indexValue].setAttribute("aria-selected", "true");
	contentArray[indexValue].removeAttribute("hidden");
	tabArray[indexValue].setAttribute("aria-selected", "true");
	tabArray[indexValue].removeAttribute("hidden");
}

/* Click Handlers
/* ==================================================== */

function clickHandler(event) {
	indexChangeSections(event);
	tabChangeSections(event);
}

/* =============  Inits and Event Listeners  ========== */
/* ==================================================== */

document.addEventListener("click", clickHandler);
