const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
      filename: "[contenthash].js",
      dependOn: "lit",
    },
    lit: {
      import: "lit",
      filename: "vendor/[contenthash].js",
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: "asset/inline",
        generator: {
          filename: "icons/[contenthash][ext]",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[contenthash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[contenthash][ext]",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
          "postcss-loader",
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
      chunks: ["index", "lit"],
    }),
  ],
};
