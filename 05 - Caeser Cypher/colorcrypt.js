var pw = "caesar", 
	keyCount = 0, 
	login = "",
	encryptMsg = '', 
	decryptMsg = '', 
	message = '',
	final = '',
	e = $("#encryptbtn")[0],
	d = $("#decryptbtn")[0],
	status;

e.addEventListener("click",function(){
	status = 1;
});
d.addEventListener("click",function(){
	status = 2;
});

$("#container").hide();
$("#container2").hide();

$(window).resize(function(){
	$("body").height($(this).height());
	
}).resize();

$(window).keypress(function(event){
	login += String.fromCharCode(event.which),
	keyCount++;
	var angle = Math.floor(Math.random()*360)+1;

	$("body").css("background",randomColor()) //fallback for older browsers
	.css("background","-webkit-linear-gradient("+ angle +"deg, " + randomColor() + ", " + randomColor() + ")")
	.css("background","linear-gradient("+ angle +"deg, " + randomColor() + ", " + randomColor() + ")");	

	if (login === pw) {
		$(this).unbind("keypress");
		$("#container").fadeIn(500);
		$("#container2").fadeIn(500);
	} else if (keyCount == pw.length) {
		keyCount = 0;
		login = '';
	}
});

function randomColor() {
	return "#"+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

$("#encryptbtn").click(crypt);
$("#decryptbtn").click(crypt);

function crypt() {
	final = '';

	message = (status == 1 ? $("#encrypt").val():$("#decrypt").val());
	// if (status == 1) {
	// 	message = $("#encrypt").val();
	// }
	// else {
	// 	message = $("#decrypt").val();
	// }

	for(var i = 0; i < message.length; i++) {
		if(message[i].charCodeAt() == 10) {
			final += String.fromCharCode(32);
		} else if (status == 1) {
			if (message[i].charCodeAt()+5 > 126) {
				if (message[i].charCodeAt()+5-95 == 32) {
					final += '\xa0';
				} else {
					final += String.fromCharCode(message[i].charCodeAt()+5 - 95);
				}
			} else {
				final += String.fromCharCode(message[i].charCodeAt()+5);
			}
		} else {
			if (message[i].charCodeAt()-5 < 32) {
					final += String.fromCharCode(message[i].charCodeAt()-5 + 95);
			} else {
				if (message[i].charCodeAt()-5 == 32) {
					final += '\xa0';
				} else {
					final += String.fromCharCode(message[i].charCodeAt()-5);
				}
			}
		}
	}
	$("#output").text(final);
}
