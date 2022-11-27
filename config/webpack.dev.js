const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const Webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devConfig = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  devServer: {
    client: {
      progress: true,
      overlay: true,
    },
    hot: true,
    port: 9000,
    proxy: {
      "/api/v1/**": {
        target: "http://localhost:3000",
        secure: false
      }
    },
    historyApiFallback: true,
    // compress: true
  },
  plugins: [
    //BundleAnalyzerPlugin - used to analyze final webpack bundle; one of the most efficient ways to perform
    //tree-shaking: https://ahamedblogs.wordpress.com/2020/02/11/reducing-js-bundle-sizes-using-tree-shaking/
    // new BundleAnalyzerPlugin(),
    //HotModuleReplacementPlugin - avoid losing state after every change made to files.
    new Webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(commonConfig, devConfig);

