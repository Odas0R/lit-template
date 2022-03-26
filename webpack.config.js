const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

// TO FOLLOW
//
// 1. https://github.com/pavelloz/webpack-tailwindcss/blob/master/webpack.config.js

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: "eval-cheap-source-map",
  entry: {
    index: {
      import: "./src/views/index.ts",
      filename: "index.js",
      dependOn: "lit",
    },
    account: {
      import: "./src/views/account/index.ts",
      filename: "account/index.js",
      dependOn: "lit",
    },
    lit: {
      import: "lit",
      filename: "shared/[name].[contenthash].js",
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { url: false } },
          "postcss-loader",
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
      chunks: ["index", "lit"],
    }),
    new HtmlWebpackPlugin({
      filename: "account/index.html",
      template: "./src/views/account/index.html",
      chunks: ["account", "lit"],
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src/views/*.html"),
    //       to: "[name][ext]",
    //     },
    //   ],
    // }),
  ],
};
