import path from "path";
import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { WebpackConfiguration } from "webpack-dev-server";
import { GenerateSW } from "workbox-webpack-plugin";

const config: WebpackConfiguration = {
  mode: "development",
  context: process.cwd(),
  entry: "./src/renderer.ts",
  output: {
    path: path.resolve(process.cwd(), "build"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
  },
  devtool: "cheap-source-map",
  optimization: {
    // runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["node_modules", "src"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/icons", to: "icons" },
        { from: "public/images", to: "images" },
      ],
    }),
    // new GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\.(?:html|js|css|png|jpg|svg)$/,
    //       handler: "StaleWhileRevalidate",
    //       options: {
    //         cacheName: "static-resources",
    //       },
    //     },
    //   ],
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    port: 3001,
    historyApiFallback: true,
    static: {
      directory: path.join(process.cwd(), "public"),
    },
    client: {
      overlay: {
        errors: true,
        runtimeErrors: true,
        warnings: true,
      },
    },
    proxy: [
      {
        context: ["/catapi"],
        target: "https://api.thecatapi.com",
        changeOrigin: true,
        // remove /catapi from url
        pathRewrite: {
          "^/catapi": "",
        },
      },
    ],
  },
};

module.exports = config;
