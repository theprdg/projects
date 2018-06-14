var doors = document.querySelectorAll(".door"),
	winDoor = Math.floor(Math.random()*3),
	pickedDoor,
	doorCount = 0, 
	revealDoor, 
	clickCount = 0, 
	a = new Array(3);

for (var i = 0; i < 3; i++) {
	if (i === winDoor) {
		a[winDoor] = "win";
	} else {
		a[i] = "lose";
	}
};

doors.forEach(function(door,index){
	function func() {
		pickedDoor = index;
	}
	door.addEventListener("click",func);
	door.addEventListener("click",updateDoors);
});

function updateDoors() {
	if(clickCount === 0) {
		if (pickedDoor === winDoor) { //if the user chooses the winning door at first selection
			var donkeyDoor = Math.floor((Math.random()*2)+1); //random selection of donkey door to reveal
			for (var i = 0; i < 3; i++) { //checks/confirms the donkey door to reveal
				if (a[i] === "lose") { 
					doorCount++;
					if (doorCount === donkeyDoor) { //randomly selected donkey door reveals donkey
						changeImage(i);
						doorCount = -10;
					}
				}
			}
		} else {
			for (var i = 0; i < 3; i++) {
				if (i !== pickedDoor && i !== winDoor) {
					changeImage(i);
				}
			}
		}
		document.getElementById("message").innerHTML = "You've selected door <strong>number " + (pickedDoor+1)+ 
			"</strong>!<br>BUT, this is what's behind door number " + revealDoor + 
			". Would you like to switch?<br><br>Select the other door if you want to switch, otherwise select the same door.";		
		clickCount++;
	} else {
		changeImage(pickedDoor);
		if (pickedDoor === winDoor) {
			document.getElementById("message").innerHTML = "Congratulations, you won the Bugatti! Hope you can afford the insurance!";
		} else {
			document.getElementById("message").innerHTML = "Oh NO! More Donkey!";
		}
		doors.forEach(function(door,index){
			door.removeEventListener("click",updateDoors);
		});
		document.getElementById("link").innerHTML = "Play Again!";
		document.getElementById("link").href = "index.html";
		document.getElementById("link").target = "_top";
	}
};

function changeImage (i) {
	if (i === winDoor) {
		document.getElementById('d'+(winDoor+1)).src='car.png';
	} else {
		doors[i].className = "donkey";
		doors[i].removeEventListener("click",updateDoors);
		revealDoor = i+1;
		document.getElementById('d'+revealDoor).src='donkey.jpg';
	}
};