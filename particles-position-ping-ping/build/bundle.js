/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateShader = __webpack_require__(2);
	
	var _shadersParticleVertexGlsl = __webpack_require__(3);
	
	var _shadersParticleVertexGlsl2 = _interopRequireDefault(_shadersParticleVertexGlsl);
	
	var _shadersParticleFragmentGlsl = __webpack_require__(4);
	
	var _shadersParticleFragmentGlsl2 = _interopRequireDefault(_shadersParticleFragmentGlsl);
	
	var _shadersSimulationVertexGlsl = __webpack_require__(5);
	
	var _shadersSimulationVertexGlsl2 = _interopRequireDefault(_shadersSimulationVertexGlsl);
	
	var _shadersSimulationFragmentGlsl = __webpack_require__(6);
	
	var _shadersSimulationFragmentGlsl2 = _interopRequireDefault(_shadersSimulationFragmentGlsl);
	
	var mouse = [0.5, 0.5];
	
	function createFramebuffer(gl, size) {
	  var width = size;
	  var height = size;
	
	  var texture = gl.createTexture();
	  var framebuffer = gl.createFramebuffer();
	
	  gl.bindTexture(gl.TEXTURE_2D, texture);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
	  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	
	  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	
	  framebuffer.texture = texture;
	
	  return framebuffer;
	}
	
	var simulationSize = 128;
	var particleCount = simulationSize * simulationSize;
	
	var SimulationRenderer = function SimulationRenderer() {
	  var program = gl.createProgram();
	
	  var vertex = (0, _utilsCreateShader.createVertexShader)(gl, _shadersSimulationVertexGlsl2['default']);
	  var fragment = (0, _utilsCreateShader.createFragmentShader)(gl, _shadersSimulationFragmentGlsl2['default']);
	
	  gl.attachShader(program, vertex);
	  gl.attachShader(program, fragment);
	
	  gl.linkProgram(program);
	
	  var buffer = gl.createBuffer();
	  var bufferData = [];
	
	  for (var x = 0; x < simulationSize; x++) {
	    for (var y = 0; y < simulationSize; y++) {
	      bufferData.push(x, y);
	    }
	  }
	
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
	
	  var referenceLocation = gl.getAttribLocation(program, 'reference');
	
	  // Vertex attribute position
	  gl.enableVertexAttribArray(referenceLocation);
	  gl.vertexAttribPointer(referenceLocation, 2, gl.FLOAT, false, 0, 0);
	
	  var timeLocation = gl.getUniformLocation(program, 'globalTime');
	  var resolutionLocation = gl.getUniformLocation(program, 'resolution');
	  var simulationSizeLocation = gl.getUniformLocation(program, 'simulationSize');
	  var mouseLocation = gl.getUniformLocation(program, 'mouse');
	  var uPositionSampler = gl.getUniformLocation(program, 'positionSampler');
	
	  var positionFramebuffer = createFramebuffer(gl, simulationSize);
	
	  this.render = function (time) {
	    gl.useProgram(program);
	
	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	    gl.clearColor(0, 0, 0, 0);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	
	    gl.uniform1f(timeLocation, time);
	    gl.uniform2fv(resolutionLocation, [canvas.width, canvas.height]);
	    gl.uniform2fv(simulationSizeLocation, [simulationSize, simulationSize]);
	    gl.uniform2fv(mouseLocation, mouse);
	
	    // Swap following lines to render to buffer/canvas
	    // gl.bindFramebuffer(gl.FRAMEBUFFER, null)
	    gl.bindFramebuffer(gl.FRAMEBUFFER, positionFramebuffer);
	
	    gl.drawArrays(gl.POINT, 0, particleCount);
	  };
	};
	
	var ParticleRenderer = function ParticleRenderer(gl) {
	  var program = gl.createProgram();
	
	  var shaders = [(0, _utilsCreateShader.createVertexShader)(gl, _shadersParticleVertexGlsl2['default']), (0, _utilsCreateShader.createFragmentShader)(gl, _shadersParticleFragmentGlsl2['default'])];
	
	  shaders.forEach(function (shader) {
	    gl.attachShader(program, shader);
	  });
	
	  gl.linkProgram(program);
	
	  var timeLocation = gl.getUniformLocation(program, 'time');
	  var mouseLocation = gl.getUniformLocation(program, 'mouse');
	  var uPositionSampler = gl.getUniformLocation(program, 'positionSampler');
	  var resolutionLocation = gl.getUniformLocation(program, 'resolution');
	  var simulationSizeLocation = gl.getUniformLocation(program, 'simulationSize');
	
	  this.render = function (time) {
	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	    gl.useProgram(program);
	
	    gl.clearColor(0, 0, 0, 1);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	
	    gl.uniform1f(timeLocation, time);
	    gl.uniform2fv(mouseLocation, mouse);
	    gl.uniform1i(uPositionSampler, 0);
	    gl.uniform2fv(resolutionLocation, [canvas.width, canvas.height]);
	    gl.uniform2fv(simulationSizeLocation, [simulationSize, simulationSize]);
	
	    gl.drawArrays(gl.POINT, 0, particleCount);
	  };
	};
	
	var canvas = document.createElement('canvas');
	var gl = canvas.getContext('webgl');
	
	var simulationRenderer = new SimulationRenderer(gl);
	var particleRenderer = new ParticleRenderer(gl);
	
	function render(ms) {
	  var time = ms / 1000;
	
	  simulationRenderer.render(time);
	  particleRenderer.render(time);
	
	  requestAnimationFrame(render);
	}
	
	function load() {
	  document.body.style.margin = '0';
	  document.body.appendChild(canvas);
	
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
	
	  gl.viewport(0, 0, canvas.width, canvas.height);
	
	  requestAnimationFrame(render);
	}
	
	function mouseMove(e) {
	  mouse = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
	}
	
	// Render on load
	window.addEventListener('load', load);
	window.addEventListener('mousemove', mouseMove);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.createVertexShader = createVertexShader;
	exports.createFragmentShader = createFragmentShader;
	function createShader(context, type, source) {
	  var shader = context.createShader(type);
	
	  context.shaderSource(shader, source);
	  context.compileShader(shader);
	
	  var error = context.getShaderInfoLog(shader);
	
	  if (error) {
	    console.error('Error compiling shader', error);
	  } else {
	    console.log('Shader compiled successfully');
	  }
	
	  return shader;
	}
	
	function createVertexShader(context, source) {
	  return createShader(context, context.VERTEX_SHADER, source);
	}
	
	function createFragmentShader(context, source) {
	  return createShader(context, context.FRAGMENT_SHADER, source);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "attribute vec2 reference;\n\nuniform vec2 resolution;\nuniform vec2 simulationSize;\nuniform float time;\nuniform vec2 mouse;\nuniform sampler2D positionSampler;\n\nvarying vec2 f_uv;\n\nconst float fixed_scale = 4.0;\n\nvec2 decode_fixed(highp vec4 v) {\n  v = floor(v * 255.0 + 0.5);\n  vec2 scaled = vec2(v.yw * 256.0 + v.xz) / 65535.0;\n  return (scaled - 0.5) * fixed_scale;\n}\n\nvoid main() {\n  gl_PointSize = 1.5;\n\n  vec4 position = texture2D(positionSampler, reference / simulationSize);\n\n  vec4 offset = vec4(-0.75, -0.75, 0.0, 0.25);\n\n  f_uv = decode_fixed(position);\n\n  gl_Position = vec4(f_uv, 0.0, 0.0) + offset;\n}"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "precision mediump float;\n\nvarying vec2 f_uv;\n\nvoid main() {\n  gl_FragColor = vec4(f_uv, 1.0, 1.0);\n}"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "attribute vec2 reference;\n\nuniform vec2 resolution;\nuniform vec2 simulationSize;\nuniform float globalTime;\n\nvarying vec2 f_reference;\nvarying vec2 f_resolution;\nvarying vec2 f_simulationSize;\nvarying float f_globalTime;\n\nvoid main() {\n  vec2 uv = reference / resolution;\n\n  f_globalTime = globalTime;\n  f_resolution = resolution;\n  f_reference = reference;\n  f_simulationSize = simulationSize;\n\n  vec4 offset = vec4(-0.5, -0.5, 0.0, 0.5);\n\n  gl_Position = vec4(uv, 0.0, 0.0) + offset;\n}"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "precision mediump float;\n\nvarying vec2 f_resolution;\nvarying vec2 f_reference;\nvarying vec2 f_simulationSize;\nvarying float f_globalTime;\n\nuniform sampler2D positionSampler;\nuniform vec2 mouse;\n\nconst float fixed_scale = 4.0;\n\nlowp vec4 encode_fixed(highp vec2 v) {\n  vec2 scaled = 0.5 + v/fixed_scale;\n  vec2 big = scaled * 65535.0/256.0;\n  vec2 high = floor(big) / 255.0;\n  vec2 low = fract(big);\n\n  return vec4(low.x,high.x,low.y,high.y);\n}\n\nvoid main() {\n  vec2 uv = f_reference / f_simulationSize;\n\n  vec2 ratio = normalize(f_simulationSize / f_resolution);\n\n  //vec2 distortion = vec2(sin(f_globalTime) * 0.1, cos(f_globalTime * 0.7) * 0.1);\n  float d = distance(uv, mouse);// + distortion);\n\n  vec2 displacement = (uv - mouse) / d * 0.2 * ratio;\n  vec2 pos = (uv + displacement) * 0.5 + 0.5;\n\n  // gl_FragColor = vec4(pos, 1.0, 1.0);\n  gl_FragColor = encode_fixed(pos);\n}"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map