const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: false,

  output: {
    publicPath: "/rfptsttc/rfp-webapp-web/script/react-app-build/",
    charset: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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
          MiniCssExtractPlugin.loader,

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
          MiniCssExtractPlugin.loader,

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
    new MiniCssExtractPlugin({
      filename: "[name]/css/index.min.css",
      chunkFilename: "[name]/css/index.min.css",
    }),
    new Dotenv({
      path: path.join(__dirname, "../environments/.env.tst"),
    }),
  ],
});
