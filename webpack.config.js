/**
 * Created by johni on 16/04/2016.
 */
module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + '/dist',
    filename: "index.min.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"}
    ]
  }
};