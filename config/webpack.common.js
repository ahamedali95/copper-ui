const path = require("path");
const srcDirectory = path.resolve(__dirname, "../src");
const publicDirectory = path.resolve(__dirname, "../public");
const buildDirectory = path.resolve(__dirname, "../build");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log("node version", process.version)

const commonConfig = {
  entry: srcDirectory+"/index.tsx",
  resolve: {
    modules: [srcDirectory, 'node_modules'],
    extensions: [ ".ts", ".tsx", ".js", ".jsx", ".png" ],
    alias: {
      api: path.resolve('src/api'),
      assets: path.resolve('src/assets'),
      hooks: path.resolve('src/hooks'),
      pages: path.resolve('src/pages'),
    }
  },
  output: {
    filename: "[name].bundle.js",
    path: buildDirectory,
    //clean-webpack-plugin - a cleanup tool used to remove old webpack builds is not needed anymore as Webpack integrated
    //that functionality already.
    clean: true
  },
  module: {
    rules: [
      //Did not allow type-checking and linting to run in the same process as the build because it will slightly
      //slow down the build. Instead scripts are added to achieve the same, plus a pre-push git hook to
      //prevent pushing out code to git if any of the aforementioned processes fail. Refer package.json
      {
        test: /\.(ts|tsx)$/,
        include: srcDirectory,
        exclude: /node_modules/,
        use: [ "babel-loader" ]
      },
      {
        test: /\.html$/,
        include: srcDirectory,
        exclude: /node_modules/,
        use: "html-loader"
      },
      //file-loader replaced by webpack's built-in loader
      {
        test: /\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    //plugin to link bundles to index.html as scripts
    new HtmlWebpackPlugin({
      template: publicDirectory+"/index.html"
    }),
    //Build progress
    new Webpack.ProgressPlugin()
  ]
};

module.exports = commonConfig;

//explore module federation