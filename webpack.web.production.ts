import path from "path";
import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import { GenerateSW } from "workbox-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { WebpackConfiguration } from "webpack-dev-server";
import CompressionPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import WebpackBar from "webpackbar";

const config: WebpackConfiguration = {
  mode: "production",
  context: process.cwd(),
  entry: "./src/renderer.ts",
  output: {
    clean: true,
    path: path.resolve(process.cwd(), "build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
    publicPath: "/",
  },
  // devtool: "cheap-source-map",
  devtool: "source-map",
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all", // Enable chunking for all modules
      minSize: 0, // Create chunks even if they are small
      cacheGroups: {
        default: false,
        core: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: "core",
          chunks: "all",
          priority: 20,
          enforce: true,
        },
        mantine: {
          test: /[\\/]node_modules[\\/]@mantine[\\/]/,
          name: "mantine",
          chunks: "all",
          priority: 15,
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -10,
        },
      },
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
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      ignoreURLParametersMatching: [/^timestamp$/], // Ignore cache-busting query, i.e. ?timestamp
      exclude: [/^\/api\//], // Prevent caching all `/api/*` requests
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === "script",
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "js-cache",
          },
        },
        {
          urlPattern: ({ request }) => request.destination === "style",
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "css-cache",
          },
        },
        {
          urlPattern: ({ request }) => request.destination === "image",
          // urlPattern: /\.(?:html|js|css|png|jpg|svg)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "image-cache",
          },
        },
      ],
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg|png|jpg|ttf|otf|woff|woff2)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new WebpackBar(),
  ],
};

module.exports = config;
