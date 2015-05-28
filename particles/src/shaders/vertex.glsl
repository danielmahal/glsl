attribute vec2 position;
uniform float time;
uniform vec2 mouse;

void main() {
  vec4 offset = vec4(-0.5, -0.5, 0.0, 0.5);

  float d = distance(mouse, position);

  vec2 displacement = (position - mouse) / d * 0.2;
  vec2 pos = position + displacement;

  gl_Position = vec4(pos, 0.0, 0.0) + offset;
}