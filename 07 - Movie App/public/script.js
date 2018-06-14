// DATA FORMATTING
var date = $(".date").text(),
		dollars = $(".dollars");

$(".date").text(dateConvert(date));

//removes all the junk characters in the queried data string
dollars.each(function(i,e){
  let d = $(e).text();
  d = d.split(' ').join('');
  d = d.slice(1,(d.length - 2)); //was not able to combine with formula above for some strange reason
  $(e).text(commaSeparate(d));
})

// converts YYYY-MM-DD to Month DD, YYYY format
function dateConvert(date) {
	var units = date.split('-');
	var newDate = new Date(units[0], units[1] - 1, units[2]); 
  newDate = newDate.toDateString();
	return newDate.slice(4,10) + ", " + newDate.slice(-4);
}

//converts queried value to comma separated dollar value
function commaSeparate(text) {
	var numComp = '',
			j = 0;
  
	if (text.length > 3) {
		for (var i = text.length-1; i >= 0; i--){
			j++;
			if (j % 3 === 0 && i !== 0) {
				numComp = ',' + text.charAt(i) + numComp;
			} else {
				numComp = text.charAt(i) + numComp;
			}
		}
	}

	return '$' + numComp;
}