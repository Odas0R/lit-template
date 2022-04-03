const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const composeEntriesHtmlPlugin = require("./webpack.utils.js");

const isProd = process.env.NODE_ENV === "production";

const [entries, htmlPlugin] = composeEntriesHtmlPlugin();

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: "eval-cheap-module-source-map",
  entry: {
    ...entries,
    lit: {
      import: "lit",
      filename: "vendor/[contenthash].js"
    },
  },
  output: {
    clean: true,
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: "asset/inline",
        generator: {
          filename: "icons/[contenthash][ext]"
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[contenthash][ext]" 
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[contenthash][ext]"
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          target: "es2015",
          tsconfigRaw: require("./tsconfig.json"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({})],
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
        css: isProd,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css"
    }),
    // Multiple Pages
    ...htmlPlugin,
  ],
};
