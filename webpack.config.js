const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'larascript',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
  },
};
