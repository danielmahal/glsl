function createShader(context, type, source) {
  var shader = context.createShader(type)

  context.shaderSource(shader, source)
  context.compileShader(shader)

  var error = context.getShaderInfoLog(shader)

  if(error) {
    console.error('Error compiling shader', error)
  } else {
    console.log('Shader compiled successfully')
  }

  return shader
}

export function createVertexShader(context, source) {
  return createShader(context, context.VERTEX_SHADER, source)
}

export function createFragmentShader(context, source) {
  return createShader(context, context.FRAGMENT_SHADER, source)
}