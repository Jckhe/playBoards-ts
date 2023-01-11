const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './client/src/index.tsx',
    mode: 'development',
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: '/',
        filename: 'bundle.js',
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './client/src/index.html'
        })
    ],
    devServer: {
        static: {
            // match the output path
            directory: path.resolve(__dirname, '/build'),
            // match the output 'publicPath'
            publicPath: '/',
          },
        proxy: {
            '/graphql': 'http://localhost:3333',
        }
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
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}], '@babel/preset-typescript']
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
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
}