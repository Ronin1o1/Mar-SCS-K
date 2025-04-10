const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const common = require("./webpack.common.js");

const proxy = {};
proxy[process.env.API_CONTEXT] = process.env.API_SERVER;
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: "./src",
    port: 1200,
    watchContentBase: true,
    proxy,
  },
  output: {
    publicPath: "/rfptc/rfp-webapp-web/script/react-app-build/",
    charset: true,
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: [
          /(node_modules)/,
          path.resolve("src/app/common/assets/styles"),
        ],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.resolve("node_modules/primeicons/primeicons.css"),
          path.resolve("node_modules/primereact/resources/primereact.css"),
          path.resolve(
            "node_modules/primereact/resources/themes/nova/theme.css"
          ),
          path.resolve("node_modules/primeflex/primeflex.css"),
          path.resolve("src/app/common/assets/styles"),
        ],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, "../environments/.env.development"),
    }),
  ],
});
