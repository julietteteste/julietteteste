'use strict';

let placeholder = document.querySelector('footer');

let setDateTime = () => {
	let dateTime = new Date()
	let options = { timeZone: 'Europe/Paris' };
	let string = `Paris, ${dateTime.toLocaleDateString(undefined, options)}, ${dateTime.toLocaleTimeString(undefined, options)}`;
	let txtNode = document.createTextNode(string);
	placeholder.innerText = txtNode.textContent;
};

setInterval(
	() => {
		setDateTime()
	}, 1000 );

setDateTime();


// Show/hide nav if user taps on menu button
let container = document.getElementById('container');
document.getElementById('about').onclick = function() {
	if ( window.getComputedStyle(container).visibility.startsWith('hidden') ) {
		container.style.visibility = "visible";
	} else {
		container.style.visibility = "hidden";
	};
};
