const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    path: path.join(__dirname, "../../build"),
    filename: "[name]/js/index.min.js",
    charset: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-object-rest-spread",
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(svg|jpe?g|png|gif|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
              name: "assets/icons/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.ejs",
      filename: "index.html",
      inject: false,
    }),
  ],
  optimization: {
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      name: "vendor",
      chunks: "all",
      maxSize: 10000,
    },
    runtimeChunk: {
      name: "runtime",
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        // sourceMap: false,
        // terserOptions: {
        //   ie8: true,
        //   safari10: true,
        //   //sourceMap: true,
        // },
      }),
    ],
  },
};
