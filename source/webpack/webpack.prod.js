/*eslint-disable*/
var webpack = require("webpack");
const { merge } = require("webpack-merge");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const createStage = require("./createStage.js");
var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, options) => {
  console.log("BUILD", env, options);
  const webpackConfig = common(env, options);
  const webappStageConfig = createStage(env, options);
  var rootPath = path.join(__dirname, "..", "..");

  return merge(webpackConfig, {
    mode: "production",
    target: "web",
    entry: {
      app: path.resolve(__dirname, "../", "app", "webapp", "src", "index.js"),
    },
    output: {
      path: path.resolve(__dirname, "../", "../", "build"),
      publicPath: "/",
      filename: "[name].min.js",
    },
    optimization: {
      minimize: true,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.(js|scss)$/,
        }),
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin(webappStageConfig),
      new GitRevisionPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        FAVICON:
          `<link rel="shortcut icon" type="image/png" href="data:image/png;base64,` +
          webappStageConfig.FAVICON +
          `"/>`,
        SCRIPT_APP: `<script src="app.min.js"></script>`,
        APP_NAME: webappStageConfig.APP_NAME,
        template: path.join(
          rootPath,
          "source",
          "app",
          "webapp",
          "src",
          "index.html"
        ),
        filename: "./index.html",
      }),
    ],
  });
};
