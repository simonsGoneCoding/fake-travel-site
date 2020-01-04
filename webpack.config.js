const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //this package allows to clear dist folder and replace files with new ones once npm run build
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // that one extracts css from main.js
const HtmlWebpackPlugin = require("html-webpack-plugin"); // that one allows to remove <script> from HTML and compile all build files with chunkhash names.
const fse = require("fs-extra");

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("copy images", function() {
      fse.copySync("./app/assets/images", "./docs/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i, //regular expression - for everything that endds with .css use css-loader
  use: [
    "css-loader?url=false", // ?url=false disables automatic handling of images
    { loader: "postcss-loader", options: { plugins: postCSSPlugins } }
  ] //index 2 in this array is object setting up postcss-loader
};

let pages = fse
  .readdirSync("./app")
  .filter(function(file) {
    return file.endsWith(".html");
  })
  .map(function(page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`
    });
  });

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: pages,
  module: {
    rules: [cssConfig]
  }
};

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader");
  config.output = {
    // creating output to designated path with chosen name for the file
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  };
  config.devServer = {
    before: function(app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true, // hot modual replacement (inject css and js into the browsers memory without needing to refresh)
    port: 3000,
    host: "0.0.0.0" // allows other devices like phone to acces app
  };
  config.mode = "development";
}

if (currentTask == "build") {
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"]
      }
    }
  });
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugins.push(require("cssnano")); //this package compreses css build file
  config.output = {
    // creating output to designated path with chosen name for the file
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs")
  };
  config.mode = "production";
  config.optimization = {
    splitChunks: { chunks: "all" }
  };
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
    new RunAfterCompile()
  );
}

module.exports = config;
