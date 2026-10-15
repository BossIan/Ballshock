const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ignoredWatch = /[\\/](node_modules|DumpStack\.log\.tmp|pagefile\.sys|swapfile\.sys|hiberfil\.sys|System Volume Information|\$RECYCLE\.BIN)([\\/]|$)/;

module.exports = {
  context: __dirname,
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
  },

  devServer: {
    host: "localhost",
    static: {
      directory: path.join(__dirname, "public"),
      watch: { ignored: ignoredWatch },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: 'assets' }
      ]
    })
  ],
  watchOptions: {
    ignored: ignoredWatch,
  },
};
