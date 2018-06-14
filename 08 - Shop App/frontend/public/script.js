$(document).ready(function () {
  console.log('ready');

  $(window).resize(function () {

    let angle = Math.floor(Math.random() * 360) + 1;
    
    $("body").height($(this).height());
    $("body")
      .css("background", "linear-gradient(" + angle + "deg, " + randomColor() + ", " + randomColor() + ")")
      .css("background", "-webkit-linear-gradient(" + angle + "deg, " + randomColor() + ", " + randomColor() + ")")

  }).resize();

  function randomColor() {
    return "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  }

})