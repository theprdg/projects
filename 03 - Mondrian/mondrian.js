var pickedColor,
	buttons = document.querySelectorAll(".button"),
	boxes = document.querySelectorAll(".box");

buttons[0].style.backgroundColor = "#FF05F3";
buttons[1].style.backgroundColor = "#FFF14C";
buttons[2].style.backgroundColor = "#09FFC3";
buttons[3].style.backgroundColor = "#fff4db";

buttons.forEach(function(button,i) {
	button.addEventListener("click",function(){
		pickedColor = this.style.backgroundColor;
	});
});

boxes.forEach(function(box,i) {
	box.addEventListener("click",function(){
		this.style.backgroundColor = pickedColor;
	});
});