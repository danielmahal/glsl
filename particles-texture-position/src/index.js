import {createVertexShader, createFragmentShader} from './utils/createShader'

import particleVertex from './shaders/particle-vertex.glsl'
import particleFragment from './shaders/particle-fragment.glsl'

import simulationVertex from './shaders/simulation-vertex.glsl'
import simulationFragment from './shaders/simulation-fragment.glsl'

var mouse = [0.5, 0.5]

function createFramebuffer(gl, size) {
  var width = size
  var height = size

  var texture = gl.createTexture()
  var framebuffer = gl.createFramebuffer()

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

  framebuffer.texture = texture

  return framebuffer
}

var simulationSize = 128;
var particleCount = simulationSize * simulationSize;

var SimulationRenderer = function() {
  var program = gl.createProgram()

  var vertex = createVertexShader(gl, simulationVertex)
  var fragment = createFragmentShader(gl, simulationFragment)

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)

  gl.linkProgram(program)

  var buffer = gl.createBuffer()
  var bufferData = []

  for(var x = 0; x < simulationSize; x++) {
    for(var y = 0; y < simulationSize; y++) {
      bufferData.push(x, y)
    }
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW)

  var referenceLocation = gl.getAttribLocation(program, 'reference')

  // Vertex attribute position
  gl.enableVertexAttribArray(referenceLocation);
  gl.vertexAttribPointer(referenceLocation, 2, gl.FLOAT, false, 0, 0)

  var timeLocation = gl.getUniformLocation(program, 'globalTime');
  var resolutionLocation = gl.getUniformLocation(program, 'resolution')
  var simulationSizeLocation = gl.getUniformLocation(program, 'simulationSize')
  var mouseLocation = gl.getUniformLocation(program, 'mouse');
  var uPositionSampler = gl.getUniformLocation(program, 'positionSampler')

  var positionFramebuffer = createFramebuffer(gl, simulationSize)

  this.render = function(time) {
    gl.useProgram(program)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniform1f(timeLocation, time)
    gl.uniform2fv(resolutionLocation, [canvas.width, canvas.height])
    gl.uniform2fv(simulationSizeLocation, [simulationSize, simulationSize])
    gl.uniform2fv(mouseLocation, mouse)

    // Swap following lines to render to buffer/canvas
    // gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, positionFramebuffer)

    gl.drawArrays(gl.POINT, 0, particleCount)
  }
}

var ParticleRenderer = function(gl) {
  var program = gl.createProgram()

  var shaders = [
    createVertexShader(gl, particleVertex),
    createFragmentShader(gl, particleFragment)
  ]

  shaders.forEach(function(shader) {
    gl.attachShader(program, shader)
  })

  gl.linkProgram(program)

  var timeLocation = gl.getUniformLocation(program, 'time');
  var mouseLocation = gl.getUniformLocation(program, 'mouse');
  var uPositionSampler = gl.getUniformLocation(program, 'positionSampler')
  var resolutionLocation = gl.getUniformLocation(program, 'resolution')
  var simulationSizeLocation = gl.getUniformLocation(program, 'simulationSize')

  this.render = function(time) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    gl.useProgram(program)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniform1f(timeLocation, time)
    gl.uniform2fv(mouseLocation, mouse)
    gl.uniform1i(uPositionSampler, 0);
    gl.uniform2fv(resolutionLocation, [canvas.width, canvas.height])
    gl.uniform2fv(simulationSizeLocation, [simulationSize, simulationSize])

    gl.drawArrays(gl.POINT, 0, particleCount)
  }
}

var canvas = document.createElement('canvas')
var gl = canvas.getContext('webgl')

var simulationRenderer = new SimulationRenderer(gl)
var particleRenderer = new ParticleRenderer(gl)

function render(ms) {
  var time = ms / 1000

  simulationRenderer.render(time)
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
