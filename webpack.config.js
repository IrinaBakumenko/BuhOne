const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
let mode = "development"
let target = "web";

if(process.env.NODE_ENV === "production") {
    mode ="production";
    target = "browserslist";
}

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: mode,
    target: target,
    
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    "css-loader", 
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: ['file-loader'],
            },
            
        ],
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/index.html'), 
            filename: 'index.html', 
            minify: false,
        }),
    ],

    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
    },
};