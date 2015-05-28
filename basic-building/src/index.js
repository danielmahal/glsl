import {createVertexShader, createFragmentShader} from './utils/createShader'

import vertexSource from './shaders/vertex.glsl'
import fragmentSource from './shaders/fragment.glsl'

var canvas = document.createElement('canvas')
var gl = canvas.getContext('webgl')

// Create program
var program = gl.createProgram()


// Create and attach shaders
var shaders = [
  createVertexShader(gl, vertexSource),
  createFragmentShader(gl, fragmentSource)
]

shaders.forEach(function(shader) {
  gl.attachShader(program, shader)
})


// Link/use program
gl.linkProgram(program)
gl.useProgram(program)


// Geometry data (two triangles form a square)
var buffer = gl.createBuffer()

var bufferData = new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,

  1, -1,
  1, 1,
  -1, 1
])

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW)


// Vertex attribute position
var position = gl.getAttribLocation(program, 'position');

gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 8, 0);


// Render on load
window.addEventListener('load', function() {
  document.body.style.margin = '0'
  document.body.appendChild(canvas)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  gl.viewport(0, 0, canvas.width, canvas.height)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
})
