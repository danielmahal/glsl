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
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateShader = __webpack_require__(2);
	
	var _shadersVertexGlsl = __webpack_require__(3);
	
	var _shadersVertexGlsl2 = _interopRequireDefault(_shadersVertexGlsl);
	
	var _shadersFragmentGlsl = __webpack_require__(4);
	
	var _shadersFragmentGlsl2 = _interopRequireDefault(_shadersFragmentGlsl);
	
	var mouse = [0.5, 0.5];
	
	var SimulationRenderer = function SimulationRenderer() {};
	
	var ParticleRenderer = function ParticleRenderer(gl) {
	  var program = gl.createProgram();
	
	  var shaders = [(0, _utilsCreateShader.createVertexShader)(gl, _shadersVertexGlsl2['default']), (0, _utilsCreateShader.createFragmentShader)(gl, _shadersFragmentGlsl2['default'])];
	
	  shaders.forEach(function (shader) {
	    gl.attachShader(program, shader);
	  });
	
	  gl.linkProgram(program);
	
	  var particleCount = 1000000;
	
	  var buffer = gl.createBuffer();
	  var bufferData = [];
	
	  for (var i = 0; i < particleCount; i++) {
	    bufferData.push(Math.random(), Math.random());
	  }
	
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
	
	  var positionLocation = gl.getAttribLocation(program, 'position');
	
	  // Vertex attribute position
	  gl.enableVertexAttribArray(positionLocation);
	  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	
	  var timeLocation = gl.getUniformLocation(program, 'time');
	  var mouseLocation = gl.getUniformLocation(program, 'mouse');
	
	  this.render = function (time) {
	    gl.useProgram(program);
	
	    gl.uniform1f(timeLocation, time);
	    gl.uniform2fv(mouseLocation, mouse);
	
	    gl.drawArrays(gl.POINT, 0, particleCount);
	  };
	};
	
	var canvas = document.createElement('canvas');
	var gl = canvas.getContext('webgl');
	
	var particleRenderer = new ParticleRenderer(gl);
	var simulationRenderer = new SimulationRenderer(gl);
	
	function render(ms) {
	  var time = ms / 1000;
	
	  gl.clearColor(0, 0, 0, 1);
	  gl.clear(gl.COLOR_BUFFER_BIT);
	
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

	module.exports = "attribute vec2 position;\nuniform float time;\nuniform vec2 mouse;\n\nvoid main() {\n  vec4 offset = vec4(-0.5, -0.5, 0.0, 0.5);\n\n  float d = distance(mouse, position);\n\n  vec2 displacement = (position - mouse) / d * 0.2;\n  vec2 pos = position + displacement;\n\n  gl_Position = vec4(pos, 0.0, 0.0) + offset;\n}"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "void main() {\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map