const path = require("path");
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

module.exports = {
  //configuration object
  entry: "./app/assets/scripts/App.js",
  output: {
    // creating output to designated path with chosen name for the file
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  devServer: {
    before: function(app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true, // hot modual replacement (inject css and js into the browsers memory without needing to refresh)
    port: 3000,
    host: "0.0.0.0" // allows other devices like phone to acces app
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i, //regular expression - for everything that endds with .css use css-loader
        use: [
          "style-loader",
          "css-loader?url=false", // ?url=false disables automatic handling of images
          { loader: "postcss-loader", options: { plugins: postCSSPlugins } }
        ] //index 2 in this array is object setting up postcss-loader
      }
    ]
  }
};
