const largeForm = document.querySelector(".large-screen");
const buttons = Array.from(document.querySelectorAll("button"));

function clickHandler(event) {
	event.preventDefault();
	if (!event.target.closest("button")) return;
	buttons.forEach((button) => {
		button.classList.remove("accent");
	});
	event.target.closest("button").classList.add("accent");
}

console.log("test");

largeForm.addEventListener("click", clickHandler);
