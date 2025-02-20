import path from "path";
import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
