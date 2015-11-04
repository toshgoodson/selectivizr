(function() {
	// we need this for the HTML5 tests in IE
	document.createElement("header");

	// determine which selector engine to use for the tests
	var selectedEngine = window.selectedEngine = (location.search == "") ? defaultEngine : unescape(location.search.substring(9));

	var engineLoaded = false;

	// write a script tag to include the required selector library
	if (selectedEngine) {
		var engineScript = document.createElement('script');
		engineScript.src = selectedEngine;
		engineScript.onreadystatechange = function() {
			if (this.readyState == 'complete' || this.readyState == 'loaded') {
				engineLoaded = true;
			}
		};
		engineScript.onload = function() {
			engineLoaded = true;
		};
		document.getElementsByTagName('head')[0].appendChild(engineScript);
	}

	// hide the page so it doesn't jump around while we set test parameters
	document.documentElement.style.marginTop = "-10000em";


	// build the options menu
	window.onload = function() {
		if (/*@cc_on!@*/false) { // IE only!
			document.getElementById('browser-internet-explorer').style.background = "#0c0";
		}
		if (engineLoaded) {
			document.getElementById('engine-loaded').style.background = '#0c0';
		}

		// if the test is being launched over the 'file' protocol, show a warning message...
		if (window.location.protocol == "file:") {
			var tests = document.getElementById("tests");
			var warning = document.createElement("p");
			warning.innerHTML = "Selectivizr cannot be run from the file system. Please ensure this test is served from a web server. See README for recommendations.";
			tests.parentNode.replaceChild(warning, tests);
		} else {
			var engineInput = document.getElementById("library");
			for (var engine in engines) {
				var optGroup = document.createElement("optgroup");
				optGroup.setAttribute("label", engine);
				for (var version in engines[engine]) {
					var option = document.createElement("option");
					option.value = engines[engine][version];
					option.appendChild( document.createTextNode(engine + " " + version));
					optGroup.appendChild(option);
				}
				engineInput.appendChild(optGroup);
			}
			engineInput.value = selectedEngine;
		}

		// test the :target pseudo-class
		location = "#target";

		// test the :focus UI pseudo-class
		document.getElementById("focus").focus();

		// show the page
		setTimeout( function() { document.documentElement.style.marginTop = 0; }, 10);
	}
}());
