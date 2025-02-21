import path from "path";
import WebpackBar from "webpackbar";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CompressionPlugin from "compression-webpack-plugin";

module.exports = {
  mode: "production",
  context: process.cwd(),
  entry: "./src/app.tsx",
  output: {
    path: path.resolve(process.cwd(), "build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
    publicPath: "/",
  },
  devtool: "source-map",
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
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg|png|jpg|ttf|otf|woff|woff2)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: "public" }],
    // }),
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
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
        // reactDom: {
        //   reuseExistingChunk: false,
        //   enforce: true,
        //   test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
        //   name: 'npm.react-dom',
        // },
        // react: {
        //   reuseExistingChunk: false,
        //   enforce: true,
        //   test: /[\\/]node_modules[\\/](react)[\\/]/,
        //   name: 'npm.react',
        // },
        // multipleChunks: {
        //   test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
        //   name: 'multipleChunks',
        //   chunks: 'all',
        //   priority: 10,
        //   enforce: true, // Ensures it always creates this chunk
        // },
        // 'my-ui': {
        //   reuseExistingChunk: false,
        //   enforce: true,
        //   test: /[\\/]packages[\\/]ui[\\/]/,
        //   name: 'my-ui',
        // },
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name(module) {
        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //     return `npm.${packageName.replace('@', '')}`;
        //   },
        // },
      },
    },
  },
};
