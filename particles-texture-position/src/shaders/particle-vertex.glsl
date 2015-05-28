attribute vec2 reference;
uniform vec2 resolution;
uniform vec2 simulationSize;
uniform float time;
uniform vec2 mouse;
uniform sampler2D positionSampler;

const float fixed_scale = 4.0;

vec2 decode_fixed(highp vec4 v) {
  v = floor(v * 255.0 + 0.5);
  vec2 scaled = vec2(v.yw * 256.0 + v.xz) / 65535.0;
  return (scaled - 0.5) * fixed_scale;
}

void main() {
  gl_PointSize = 2.0;

  vec4 position = texture2D(positionSampler, reference / simulationSize);

  vec4 offset = vec4(-0.75, -0.75, 0.0, 0.25);

  gl_Position = vec4(decode_fixed(position), 0.0, 0.0) + offset;
}