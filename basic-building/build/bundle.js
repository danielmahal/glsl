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
	
	var canvas = document.createElement('canvas');
	var gl = canvas.getContext('webgl');
	
	// Create program
	var program = gl.createProgram();
	
	// Create and attach shaders
	var shaders = [(0, _utilsCreateShader.createVertexShader)(gl, _shadersVertexGlsl2['default']), (0, _utilsCreateShader.createFragmentShader)(gl, _shadersFragmentGlsl2['default'])];
	
	shaders.forEach(function (shader) {
	  gl.attachShader(program, shader);
	});
	
	// Link/use program
	gl.linkProgram(program);
	gl.useProgram(program);
	
	// Geometry data (two triangles form a square)
	var buffer = gl.createBuffer();
	
	var bufferData = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
	
	// Vertex attribute position
	var position = gl.getAttribLocation(program, 'position');
	
	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 8, 0);
	
	// Render on load
	window.addEventListener('load', function () {
	  document.body.style.margin = '0';
	  document.body.appendChild(canvas);
	
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
	
	  gl.viewport(0, 0, canvas.width, canvas.height);
	
	  gl.clearColor(0, 0, 0, 1);
	  gl.clear(gl.COLOR_BUFFER_BIT);
	  gl.drawArrays(gl.TRIANGLES, 0, 6);
	});

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

	module.exports = "attribute vec2 position;\nvarying vec2 v_position;\n\nvoid main() {\n  gl_Position = vec4(position, 1, 1);\n  v_position = position;\n}"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "precision mediump float;\nvarying vec2 v_position;\n\nvoid main() {\n  gl_FragColor = vec4(v_position.y * 0.5 + 0.5, 0.0, v_position.x * 0.5 + 0.5, 1);\n}"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map