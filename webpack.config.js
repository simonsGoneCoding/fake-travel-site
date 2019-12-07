const path = require("path");
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
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
  mode: "development",
  watch: true, //auto-generate 'pm run dev' (in package.json:   scripts: {"dev": "webpack"}) to stop ctrl + c in terminal
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
