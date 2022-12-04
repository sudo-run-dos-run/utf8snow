/*!
// Origin of this script:
// Snow.js - v0.0.3
// kurisubrooks.com
*/

/*!
// sciiSnow script history:
// v0.1.1 | 2021-12-01 | by Tobias Weigl: Optimized Snow Amount and Rendering, made snow flakes non-clickable
// v0.1.2 | 2022-12-02 | by Tobias Weigl: Moved Snow Flakes into Separate DOM Container "snowContainer", changed snow flakes to ASCII art, added random snow flake rotation
//
// TODO: Asynchronous calls in this script are not clean (i.e., after the body has loaded, the script should be runnable, but the activation call can be before or after this event)
// TODO: CSS snow style should be refactored into a css class
// TODO: Check if transparency looks cool for the snow flakes
//
// NOTE: We keep this script free from jQuery dependencies, because it should be lightweight. It should be only 1 file.
*/

var snowEntities = ["&#x2022;", "x", "$", "o", "#", "/", "&#x20BF;", "&sect;", "&para;", ";", "&amp", "?", "%"];

// Config
var snowMax = 150;
var snowRefresh = 25;
var snowSpeed = 0.25;
var snowMinSize = 8;
var snowMaxSize = 30;
var snowColor = ["#999", "#BBB", "#EEE"];

// Additional Styles
var snowStyles = "cursor:default; user-select:none; pointer-events:none; position:absolute; ";

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnowFX() {

	for (i = 0; i <= snowMax; i++) {
		let s = document.createElement('div');
		s.setAttribute('id', 'flake' + i);
		s.setAttribute('style', snowStyles + " rotate:" + (Math.random() * 60 - 30) + "deg; " + "top:-" + snowMaxSize);
		s.innerHTML = snowEntities[randomise(snowEntities.length)];
                document.getElementById('snowContainer').append(s);
	}


	var snowSize = snowMaxSize - snowMinSize;
	
	marginBottom = document.body.scrollHeight + 10;
	marginRight = document.body.clientWidth + 10;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 50;
		pos[i] = 0.05 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resizeSnowFX() {
	marginBottom = document.body.scrollHeight + 10;
	marginRight = document.body.clientWidth + 10;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(0.3 * coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

function addSnowContainer () {
	let d = document.createElement('div');
	d.setAttribute('id', 'snowContainer');
	document.body.prepend(d);
};

window.addEventListener('load', addSnowContainer);
window.addEventListener('resize', resizeSnowFX);