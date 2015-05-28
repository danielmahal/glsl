precision mediump float;

varying vec2 f_resolution;
varying vec2 f_reference;
varying vec2 f_simulationSize;
varying float f_globalTime;

uniform sampler2D positionSampler;
uniform vec2 mouse;

const float fixed_scale = 4.0;

lowp vec4 encode_fixed(highp vec2 v) {
  vec2 scaled = 0.5 + v/fixed_scale;
  vec2 big = scaled * 65535.0/256.0;
  vec2 high = floor(big) / 255.0;
  vec2 low = fract(big);

  return vec4(low.x,high.x,low.y,high.y);
}

void main() {
  vec2 uv = f_reference / f_simulationSize;

  float d = distance(uv, mouse);

  vec2 displacement = (uv - mouse) / d * 0.2;
  vec2 pos = (uv + displacement) * 0.5 + 0.5;

  gl_FragColor = encode_fixed(pos);
}