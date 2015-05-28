import {createVertexShader, createFragmentShader} from './utils/createShader'

import vertexSource from './shaders/vertex.glsl'
import fragmentSource from './shaders/fragment.glsl'

var mouse = [0.5, 0.5]

var SimulationRenderer = function() {

}

var ParticleRenderer = function(gl) {
  var program = gl.createProgram()

  var shaders = [
    createVertexShader(gl, vertexSource),
    createFragmentShader(gl, fragmentSource)
  ]

  shaders.forEach(function(shader) {
    gl.attachShader(program, shader)
  })

  gl.linkProgram(program)

  var particleCount = 1000000;

  var buffer = gl.createBuffer()
  var bufferData = []

  for(var i = 0; i < particleCount; i++) {
    bufferData.push(Math.random(), Math.random())
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW)

  var positionLocation = gl.getAttribLocation(program, 'position');

  // Vertex attribute position
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  var timeLocation = gl.getUniformLocation(program, 'time');
  var mouseLocation = gl.getUniformLocation(program, 'mouse');

  this.render = function(time) {
    gl.useProgram(program)

    gl.uniform1f(timeLocation, time)
    gl.uniform2fv(mouseLocation, mouse)

    gl.drawArrays(gl.POINT, 0, particleCount)
  }
}

var canvas = document.createElement('canvas')
var gl = canvas.getContext('webgl')

var particleRenderer = new ParticleRenderer(gl)
var simulationRenderer = new SimulationRenderer(gl)

function render(ms) {
  var time = ms / 1000

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  particleRenderer.render(time)

  requestAnimationFrame(render)
}

function load() {
  document.body.style.margin = '0'
  document.body.appendChild(canvas)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  gl.viewport(0, 0, canvas.width, canvas.height)

  requestAnimationFrame(render)
}

function mouseMove(e) {
  mouse = [e.clientX / window.innerWidth, 1 - (e.clientY / window.innerHeight)]
}

// Render on load
window.addEventListener('load', load)
window.addEventListener('mousemove', mouseMove)
