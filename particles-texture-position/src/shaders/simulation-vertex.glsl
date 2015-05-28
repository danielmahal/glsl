attribute vec2 reference;

uniform vec2 resolution;
uniform vec2 simulationSize;
uniform float globalTime;

varying vec2 f_reference;
varying vec2 f_resolution;
varying vec2 f_simulationSize;
varying float f_globalTime;

void main() {
  vec2 uv = reference / resolution;

  f_globalTime = globalTime;
  f_resolution = resolution;
  f_reference = reference;
  f_simulationSize = simulationSize;

  vec4 offset = vec4(-0.5, -0.5, 0.0, 0.5);

  gl_Position = vec4(uv, 0.0, 0.0) + offset;
}