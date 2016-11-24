var system = require('system')
var webPage = require('webpage');
var page = webPage.create();
var args = system.args;

// Check if we can find the URL behind the skip_button
function checkURL() {
	var url;
	url = page.evaluate(function() {
		if(document.getElementById('skip_button')) {
			return document.getElementById('skip_button').href
		}
		//return null;
	});
	if (url) {
		// Found it! Log to output and exit.
		console.log(url);
		phantom.exit ( 0 );
	}
	else {
		// Didn't find it, try again in a second.
		setTimeout(function() {
			checkURL();
		}, 1 * 1000);
	}
}

if (args.length === 2) {
	// Exit if script takes longer then 20 seconds
	setTimeout(function() { 
		phantom.exit( 1 );
	}, 20 * 1000); 
	// Open url and call check function
	page.open(args[1], function(status) {
		checkURL();
	});
}
else {
	phantom.exit( 1 );
}

