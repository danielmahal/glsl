precision mediump float;
varying vec2 v_position;

void main() {
  gl_FragColor = vec4(v_position.y * 0.5 + 0.5, 0.0, v_position.x * 0.5 + 0.5, 1);
}