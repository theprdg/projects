var pw = "caesar", //password to access app
  keyCount = 0, //track number of keystrokes for password
  login = "", //user input password
  message = '', //message to be encrypted/decrypted
  final = '', //decrypted/encrypted message
  e = $("#encryptbtn")[0],
  d = $("#decryptbtn")[0],
  status;

//set status identifier for encryption or decryption
e.addEventListener("click", function () {
  status = 1;
});

d.addEventListener("click", function () {
  status = 2;
});

//hide app
$("#container").hide();
$("#container2").hide();

//capture user input
$(window).keypress(function (event) {
  login += String.fromCharCode(event.which),
    keyCount++;
  var angle = Math.floor(Math.random() * 360) + 1;

  //change background color 
  $("body").css("background", randomColor()) 
    .css("background", "-webkit-linear-gradient(" + angle + "deg, " + randomColor() + ", " + randomColor() + ")")
    .css("background", "linear-gradient(" + angle + "deg, " + randomColor() + ", " + randomColor() + ")");

  //password verification
  if (login === pw) {
    $(this).unbind("keypress");
    $("#container").fadeIn(500);
    $("#container2").fadeIn(500);

  //reset input counter if password unsuccessful
  } else if (keyCount == pw.length) {
    keyCount = 0;
    login = '';
  }
});

//random color generator
function randomColor() {
  return "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
}

//run encrypt/decrypt function
$("#encryptbtn").click(crypt);
$("#decryptbtn").click(crypt);

function crypt() {
  final = '';

  message = (status == 1 ? $("#encrypt").val() : $("#decrypt").val());

  for (var i = 0; i < message.length; i++) {

    //replace 'new line' (hex code 10) with 'space' (hex code 32)
    if (message[i].charCodeAt() == 10) {
      final += String.fromCharCode(32);
    } else if (status == 1) {

      //apply caesar cypher by shifting the characters by 5 positions

      //return to beginning of printing character cycle if encrypted character code exceeds last character code (i.e. '~')
      if (message[i].charCodeAt() + 5 > 126) {

        //maintain spaces within the message
        if (message[i].charCodeAt() + 5 - 95 == 32) {
          final += '\xa0';
        } else {
          final += String.fromCharCode(message[i].charCodeAt() + 5 - 95);
        }
      } else {
        final += String.fromCharCode(message[i].charCodeAt() + 5);
      }
    } else {
      if (message[i].charCodeAt() - 5 < 32) {
        final += String.fromCharCode(message[i].charCodeAt() - 5 + 95);
      } else {
        if (message[i].charCodeAt() - 5 == 32) {
          final += '\xa0';
        } else {
          final += String.fromCharCode(message[i].charCodeAt() - 5);
        }
      }
    }
  }
  $("#output").text(final);
}
