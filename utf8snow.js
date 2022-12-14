/*!
// https://github.com/sudo-run-dos-run/utf8snow by Tobias Weigl https://www.tobias-weigl.de
// - based on Snow.js - v0.0.3 by kurisubrooks.com
*/

// Decl namespace 'utf8snow'
var utf8snow,
    utf8snow = utf8snow || {};

// Impl namespace 'utf8snow'
utf8snow = (function () {

	// Public API Enum for supported snow modes
	const SnowModes = {
		UTF8 : 0,
		CLASSIC : 1
	};

	// Public API config variable for snow mode
	var snowMode;

	// Internal Config
	const _snowEntitiesUtf8 = ["&#x2022;", "x", "$", "o", "#", "/", "&#x20BF;", "&sect;", "&para;", ";", "&amp;", "?", "%"];
	const _snowEntitiesClassic = ["&#x2022;"];
	const _snowMax = 180;
	const _snowRefresh = 25;
	const _snowSpeed = 0.25;
	const _snowMinSize = 8;
	const _snowMaxSize = 30;
	// Range [0, 1]: 0 = no effect, 1 = complete transparency
	const _snowTransparencyOffset = 0.05;
	// Range [0, 1]: 0 = max background-foreground transparency gradient, 1 = no transparency gradient
	const _snowTransparencyDamper = 0.25;
	const _snowColor = 'white';

	var _snow = [],
		_pos = [],
		_coords = [],
		_lefr = [],
		_marginBottom,
		_marginRight;

	function _randomize(range) {
		_rand = Math.floor(range * Math.random());
		return _rand;
	}

	function _addSnowContainer() {
		let _d = document.createElement('div');
		_d.setAttribute('id', 'snowContainer');
		_d.setAttribute('style', 'position:fixed; z-index:1000; height:100%; width:100%; pointer-events:none; cursor:default; user-select:none;');
		document.body.prepend(_d);
	}

	function _addCss() {
		let _c = document.createElement('style');
		_c.setAttribute('type', 'text/css');
		_c.textContent = '.staticSnowFlakeStyles {position:absolute;color:' + _snowColor + '}';
		document.head.append(_c);
	}

	function _resizeSnowFX() {
		_marginBottom = document.getElementById('snowContainer').clientHeight + 10;
		_marginRight = document.getElementById('snowContainer').clientWidth + 10;
	}

	function _moveSnow() {
		for (var _i = 0; _i < _snowMax; _i++) {
			_coords[_i] += _pos[_i];
			_snow[_i].posY += _snow[_i].sink;
			_snow[_i].style.left = _snow[_i].posX + _lefr[_i] * Math.sin(0.3 * _coords[_i]) + "px";
			_snow[_i].style.top = _snow[_i].posY + "px";

			if (_snow[_i].posY >= _marginBottom - 2 * _snow[_i].size + _snowMaxSize) {
				_snow[_i].posX = _randomize(_marginRight - _snow[_i].size);
				_snow[_i].posY = -_snowMaxSize ;
			}
		}

		setTimeout(_moveSnow, _snowRefresh);
	}

	function _initSnowFX() {
		
		var _snowEntities;
		
		if (typeof utf8snow.snowMode === 'undefined') {
			utf8snow.snowMode = SnowModes.UTF8;
		}

		if (utf8snow.snowMode == SnowModes.CLASSIC) {
			_snowEntities = _snowEntitiesClassic;
		} else {
			_snowEntities = _snowEntitiesUtf8;
		}
		
		_addSnowContainer();
		_addCss();
		
		for (_i = 0; _i < _snowMax; _i++) {
			let _s = document.createElement('div');
			_s.setAttribute('id', 'flake' + _i);
			_s.setAttribute('class', 'staticSnowFlakeStyles');
			_s.innerHTML = _snowEntities[_randomize(_snowEntities.length)];
			document.getElementById('snowContainer').append(_s);
		}

		var _snowSize = _snowMaxSize - _snowMinSize;
		
		_resizeSnowFX();

		for (_i = 0; _i < _snowMax; _i++) {
			_coords[_i] = 0;
			_lefr[_i] = Math.random() * 50;
			_pos[_i] = 0.05 + Math.random() / 10;
			_snow[_i] = document.getElementById("flake" + _i);
			_snow[_i].size = _randomize(_snowSize) + _snowMinSize;
			_snow[_i].style.fontSize = _snow[_i].size + "px";
			_snow[_i].style.opacity = (_snowTransparencyDamper + (1 - _snowTransparencyDamper) * ((_snow[_i].size - _snowMinSize) / (_snowMaxSize - _snowMinSize))) - _snowTransparencyOffset;
			_snow[_i].sink = _snowSpeed * _snow[_i].size / 5;
			_snow[_i].posX = _randomize(_marginRight - _snow[_i].size);
			_snow[_i].posY = _randomize(2 * _marginBottom - _marginBottom - 2 * _snow[_i].size);
			_snow[_i].style.rotate = _randomize(Math.random() * 60) - 30 + "deg";
			_snow[_i].style.left = _snow[_i].posX + "px";
			_snow[_i].style.top = _snow[_i].posY + "px";
		}

		window.addEventListener('resize', _resizeSnowFX);

		_moveSnow();
	}

	function startSnow() {
		
		if (document.readyState == 'complete') {
			_initSnowFX();
		} else {
			window.addEventListener('load', _initSnowFX);
		}
	}

	return {
		snowMode : snowMode,
		SnowModes : SnowModes,
		startSnow : startSnow
	}
	
}());