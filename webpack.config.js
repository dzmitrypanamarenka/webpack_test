const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: __dirname + '/src',
  entry: {
    home: './home',
    about: './about',
    common: ['./welcome', './common']
    //function which was imported from 'welcome' doesn't exist in 'home' & 'about' files
    //now it's in 'common' file as common for both files - cached and downloaded just one time
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: '[name]' //create a global variable 'home'
  },
  watch: NODE_ENV === 'development', //depends on environment
  watchOptions: {
    aggregateTimeout: 100  //webpack waiting for editor saving
  },
  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : 'source-map',
  //source maps, wp shows s-maps in browser; created build.js.map file as a subfile for build js
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
      //what we has typed in cli when started webpack 'NODE_ENV=prod webpack' => prod
      //EnvironmentPlugin
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      //create file 'common' with common code of modules in entry (webpack head, babel etc)
      //remains just code special for each file
      minChunks: 2, // 2 or more files chould use common code
      // chunks: ['home', 'about'] //exact names of files
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common-goods',
    //   chunks: ['shop', 'cart'] //another file for common code
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     unsafe: true
    //   }
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
  //resolve: {} - module finding

};

// if(NODE_ENV === 'production'){
//   module.exports.plugins.push {
//     new.webpack.optimize.UglifyJsPlugin()
//   }
// }