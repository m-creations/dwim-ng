/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = pkg.name;

// fix for Webpack warning 'Critical dependency: the request of a dependency is an expression'
// https://github.com/angular/angular/issues/20357
let plugins = [
  new webpack.ContextReplacementPlugin(/@angular\/core\/esm5/, path.join(__dirname, './client'))
];

let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      /* fix for KeyboardEvent is not defined https://github.com/valor-software/ngx-bootstrap/issues/964 */
      {
        test: /\.(ts|js)$/,
        loader: 'regexp-replace-loader',
        query: {
          match: {
            pattern: '\\[(Mouse|Keyboard)Event\\]',
            flags: 'g'
          },
          replaceWith: '[]'
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
