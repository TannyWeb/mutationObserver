function waitUntilTrue(fn, cb, time) {
	var timeUp = false;

	startTimer();
	isTrue();

	function isTrue() {
		if (fn()) return cb();
		if (timeUp) return;
		window.requestAnimationFrame(isTrue);
	}

	function startTimer() {
		if (!(time && time.timeout)) return;

		window.setTimeout(function stopTimer() {
			return (timeUp = true);
		}, time.timeout);
	}
}

waitUntilTrue(
	function() {
		return document.querySelectorAll('#ELEMENT_HERE').length > 0;
	},
	init,
	{ timeout: 5000 }
);

function init() {
	// code here
}
