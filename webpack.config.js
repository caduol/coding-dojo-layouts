const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  // cria uma referencia do caminho onde estao os arquivos
  // a partir do context os demais elementos o tomam como referencia para o path
  context: path.resolve(__dirname, "src"),
  entry: ["./index.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      template: "./views/index.html",
      filename: "index.html",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      title: "About",
      template: "./views/about.html",
      filename: "about.html",
      minify: false,
    }),
    new MinifyPlugin(
      {},
      {
        comments: false,
      }
    ),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/views/partials/navigation.html"),
      location: "navigation",
      template_filename: ["index.html", "about.html"],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
