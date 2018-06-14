/**
function randomImg(){
	var randomNumber = Math.floor(Math.random() * 16) + 1;
	var imgName = "img" + randomNumber + ".jpg";
	document.getElementById("imageid").src= "/images/" + imgName ;
}
**/
function changeText() {
	document.getElementById("imageid").innerHTML='Hello World'	
}
