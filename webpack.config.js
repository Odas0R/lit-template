const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

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
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
    extensions: ['.ts', '.js'],
  },
  plugins: [
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
