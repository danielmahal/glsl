precision mediump float;

varying vec2 f_uv;

void main() {
  gl_FragColor = vec4(f_uv, 1.0, 1.0);
}