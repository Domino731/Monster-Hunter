const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartials = require('html-webpack-partials-plugin')


module.exports = {
    entry: './src/app.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: "home",
            template: "index.html",
            filename: "index.html",
            minify: {
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new HtmlWebpackPlugin({
            title: "login",
            template: "login.html",
            filename: "login.html",
            minify: {
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new HtmlWebpackPlugin({
            title: "register",
            template: "register.html",
            filename: "register.html",
            minify: {
                minifyCSS: true,
                minifyJS: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset"
            },
            {
                test: /\.(svg)$/i,
                type: "asset/source"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    }
}