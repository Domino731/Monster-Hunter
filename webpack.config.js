const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entryPath = ".";

module.exports = {
  entry: {
    style: `./${entryPath}/app/style.ts`,
    signIn: `./app/signIn.ts`,
    index: `./app/index.ts`
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, `${entryPath}/build`)
  },
  devServer: {
    contentBase: path.join(__dirname, `${entryPath}`),
    publicPath: "/build/",
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
},
};
