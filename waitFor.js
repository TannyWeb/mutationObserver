/**
* A poller which allows you to wait for specific criteria before running
* a callback function.
*/

// Usage #1 - CSS Selector - Wait for an element to exist
waitFor('body', myFunction);

// Usage #2 - Function - Write a custom function that returns either true or false
waitFor(function() {
	if (window.myVariable !== undefined) {
		return true;
	} else {
		return false;
	}
}, myFunction);

// Usage #3 - Array - Pass in an array of functions and/or CSS selectors
// that ALL MUST RETURN TRUE for your callback to fire
waitFor([ myTest, myTest2, myTest3 ], myFunction);

/**
 * 
 * @param {string|function|array} assertion - Either a CSS selector, a function that returns a boolean, or an array of functions
 * @param {function} callback - The function to run when the assertion has returned true
 * @param {number} [interval=100] - How many milliseconds between each attempt
 * @param {number} [maxAttempts=1000] - Maximum number of attempts before giving up
 */
function waitFor(assertion, callback, interval, maxAttempts) {
	var INT = interval || 100;
	var LIMIT = maxAttempts || 1000;
	var test, timer;
	if (typeof assertion === 'function') {
		test = assertion;
	} else if (typeof assertion === 'string') {
		test = function() {
			return document.querySelectorAll(assertion).length > 0;
		};
	} else if (Array.isArray(assertion)) {
		test = function() {
			return (
				assertion
					.reduce(function(o, n) {
						if (typeof n !== 'function' && typeof n !== 'string') {
							window.clearInterval(timer);
							throw new Error('assertion is not a string or function');
						}
						o.push(typeof n === 'function' ? n() : document.querySelectorAll(n).length > 0);
						return o;
					}, [])
					.indexOf(false) === -1
			);
		};
	} else {
		throw new Error('assertion must be a Function, String, or Array');
	}

	function loop() {
		if (--LIMIT === 0) {
			window.clearInterval(timer);
			return;
		}
		if (test() === true) {
			window.clearInterval(timer);
			callback();
		}
	}
	if (typeof test === 'function') {
		timer = window.setInterval(loop, INT);
		loop();
	}
}
