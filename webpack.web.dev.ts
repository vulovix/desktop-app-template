import path from "path";
import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";

module.exports = {
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    port: 3001,
    historyApiFallback: true,
    static: {
      directory: path.join(process.cwd(), "dist-web"),
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
