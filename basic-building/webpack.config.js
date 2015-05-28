module.exports = {
  context: __dirname + '/src',

  devtool: 'source-map',

  entry: [
    './index.js',
    './index.html'
  ],

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },

      {
        test: /\.glsl$/,
        loader: 'raw'
      },

      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
}