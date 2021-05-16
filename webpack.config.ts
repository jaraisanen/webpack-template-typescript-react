import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

/* Todo when fixed:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
 */

interface Config extends Configuration {
  devServer?: DevServerConfiguration;
}

const config: Config = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist", "index.tsx")
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    }),
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".svg"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true
  }
};

export default config;
