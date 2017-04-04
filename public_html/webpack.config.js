const path = require('path');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "output.bundle.js"
  },
  module: {
    loaders: [
      {
        test: new RegExp('jsx?$'),
        loader: 'babel-loader',
        exclude: new RegExp('./node_modules'),
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['istanbul']
        }
      }
    ]
  }
};
