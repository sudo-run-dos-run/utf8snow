/*!
// https://github.com/sudo-run-dos-run/utf8snow by Tobias Weigl https://www.tobias-weigl.de/
// - based on Snow.js - v0.0.3 by kurisubrooks.com
//
// TODO: Check if transparency looks cool for the snow flakes
*/

// Init namespace 'utf8snow'
var utf8snow,
    utf8snow = utf8snow || {};

// Def namespace 'utf8snow'
utf8snow = (function () {
		
	// Public API Enums
	const snowModes = {
		UTF8 : 0,
		CLASSIC : 1
	};

	// Internal Config

	const snowEntitiesUtf8 = ["&#x2022;", "x", "$", "o", "#", "/", "&#x20BF;", "&sect;", "&para;", ";", "&amp", "?", "%"];
	const snowEntitiesClassic = ["&#x2022;"];

	const snowMax = 150;
	const snowRefresh = 25;
	const snowSpeed = 0.25;
	const snowMinSize = 8;
	const snowMaxSize = 30;
	const snowColor = ["#999", "#BBB", "#EEE"];

	var snow = [],
		pos = [],
		coords = [],
		lefr = [],
		marginBottom,
		marginRight;

	function _randomize(range) {
		rand = Math.floor(range * Math.random());
		return rand;
	}

	function _addSnowContainer() {
		let d = document.createElement('div');
		d.setAttribute('id', 'snowContainer');
		document.body.prepend(d);
		return undefined;
	}
	
	function _moveSnow() {
		for (i = 0; i <= snowMax; i++) {
			coords[i] += pos[i];
			snow[i].posY += snow[i].sink;
			snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(0.3 * coords[i]) + "px";
			snow[i].style.top = snow[i].posY + "px";

			if (snow[i].posY >= marginBottom - 2 * snow[i].size + snowMaxSize || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i]) + snowMaxSize) {
				snow[i].posX = _randomize(marginRight - snow[i].size);
				snow[i].posY = -snowMaxSize ;
			}
		}

		setTimeout(_moveSnow, snowRefresh);
	}

	function _initSnowFX() {
		
		if (typeof snowMode === 'undefined') {
			snowMode = snowModes.UTF8;
		}

		if (snowMode == snowModes.CLASSIC) {
			snowEntities = snowEntitiesClassic;
		} else {
			snowEntities = snowEntitiesUtf8;
		}
		
		_addSnowContainer();
		_addCss();
		
		for (i = 0; i <= snowMax; i++) {
			let s = document.createElement('div');
			s.setAttribute('id', 'flake' + i);
			s.setAttribute('class', 'staticSnowFlakeStyles');
			s.innerHTML = snowEntities[_randomize(snowEntities.length)];
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
			snow[i].size = _randomize(snowSize) + snowMinSize;
			snow[i].style.fontSize = snow[i].size + "px";
			snow[i].style.color = snowColor[_randomize(snowColor.length)];
			snow[i].sink = snowSpeed * snow[i].size / 5;
			snow[i].posX = _randomize(marginRight - snow[i].size);
			snow[i].posY = _randomize(2 * marginBottom - marginBottom - 2 * snow[i].size);
			snow[i].style.rotate = _randomize(Math.random() * 60) - 30 + "deg";
			snow[i].style.left = snow[i].posX + "px";
			snow[i].style.top = snow[i].posY + "px";
		}
		
		_moveSnow();
	}

	function _resizeSnowFX() {
		marginBottom = document.body.scrollHeight + 10;
		marginRight = document.body.clientWidth + 10;
	}

	function _addCss() {
		let c = document.createElement('style');
		c.setAttribute('type', 'text/css');
		c.textContent = '.staticSnowFlakeStyles {position:absolute; z-index:1000; fontFamily:inherit; cursor:default; user-select:none; pointer-events:none; }';
		document.head.append(c);
	}
		
	function startSnow() {
		
		if (document.readyState == 'complete') {
			_initSnowFX();
		} else {
			window.addEventListener('load', _initSnowFX);
		}
		
		window.addEventListener('resize', _resizeSnowFX);
	}
	
	return {
		snowModes : snowModes,
		startSnow : startSnow
	}
}());