const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './client/src/index.js',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'client/dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './client/src/index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        static: {
            // match the output path
            directory: path.resolve(__dirname, 'client/dist'),
            // match the output 'publicPath'
            publicPath: '/',
          },
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
              },
              {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ["file-loader"],
              },
        ]
    }
}