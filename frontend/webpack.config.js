const path = require("path");

module.exports = {
  entry: [path.resolve(__dirname, "src/index.js")],

  output: {
    path: path.resolve(__dirname, "static/frontend/public/"),

    publicPath: "/static/frontend/public/",
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/env", "@babel/preset-react"] },
        },
      },
    ],
  },
  devServer: {
    writeToDisk: true,
  },
};
