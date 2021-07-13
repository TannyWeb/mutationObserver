/*
* Create a new observer and call your desired function
* in the callback
*/
var observer = new MutationObserver(function(mutations) {
	// Useful for seeing how many times your function is fired
	console.count('Observer fired'); // Remove before production
	// Call your script
	yourScript();
});

/*
* Select the element who's contents can be updated via AJAX
*/
var observerTarget = document.querySelector('.search-results');

/*
* Start observing...
*/
if (observerTarget) {
	observer.observe(observerTarget, { childList: true });
}
