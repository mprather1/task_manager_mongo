const webpack = require("webpack");
const path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'app', 'index.html'),
  filename: 'index.html',
  inject: 'body'
});

var paths = {
  ENTRY: path.join(__dirname, 'app', 'main.js'),
  OUTPUT_FILENAME: "bundle.js",
  OUTPUT: path.join(__dirname, "app", 'static'),
  APP: path.join(__dirname, 'app')
};

module.exports = {
  debug: true,
  entry: [
    paths.ENTRY
  ],
  devServer: {
    contentBase: "./app"
  },
  resolve: {
    alias: {
      "marionette": "backbone.marionette",
      'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
      modules: path.join(__dirname, "node_modules"),       
    }
  },
  module: {
    preLoaders: [
     {
       test: /\.js$/,
       include: paths.APP,
       exclude: [/node_modules/, paths.OUTPUT],
       loader: 'jshint-loader'
      }
    ],
    loaders: [
      { 
        test: /\.html/, include: path.join(paths.APP, 'templates'),
        loader: "underscore-template-loader" },
      { 
        test: /(\.css|\.scss)$/, include: [path.join(paths.APP, 'public'), path.join(__dirname, 'node_modules')],
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      { test: /\.(jpe?g|png|gif)$/i, loader:"file" },      
    ],
  },
  output: {
    filename: paths.OUTPUT_FILENAME,
    path: paths.OUTPUT,        
    chunkFilename: "[id].js"
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      'jQuery': 'jquery',
      '$': 'jquery',
      'global.jQuery': 'jquery',     
      _: 'underscore'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin("bundle.css"),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // })
  ]
};