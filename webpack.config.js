// node 16.6.2
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'development',
  entry: {
    bundle: ['./assets/src/js/index.js', './assets/src/scss/styles.scss']
    // bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './assets/dist'),
    filename: '[name].js',
    clean: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ]
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        // files: ['./**/*.php', './**/*.scss', './**/*.css', './**/*.js', './**/*.html'],
        files: ['./**/*.css', './**/*.js', './**/*.php'],
        proxy: 'https://mysite.loc'
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        // reload: false,
        injectCss: true
      }
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ]
}
