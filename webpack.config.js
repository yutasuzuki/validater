var webpack = require('webpack');

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: "app.dst.js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
              presets: ['es2015']
          }
        }
      ]
    },
    // plugins: [
    //     new webpack.ResolverPlugin(
    //         new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    //     ),
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new webpack.optimize.OccurenceOrderPlugin(),
    //     new webpack.optimize.AggressiveMergingPlugin(),
    //     new webpack.ProvidePlugin({
    //         jQuery: "jquery",
    //         $: "jquery"
    //     })
    // ],
};
