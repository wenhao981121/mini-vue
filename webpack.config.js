const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const DEVELOPMENT = 'development'
const PRODUCTION = 'production'
module.exports = {
    mode: DEVELOPMENT,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[contenthash:10].js',
    },
    target: 'web',
    module: {
        rules: [


        ]
    },
    plugins: [

        new HtmlWebpackPlugin({// 生成入口index.html
            template: './src/index.html'
        }),

    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 9000,
        open: true, // 自动打开浏览器
        hot: true, //开启HMR功能
        
      },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'src'),
        }
    },
    optimization: { // 将node_moduleds中的代码单独打包成chunk输出，并分析多入口中是否有公共库（如jquery）如果有，复用
        // 触发代码分割必须满足2个：1.production环境 2.用es模块
        splitChunks: {
            chunks: 'all'
        }
    },
    // source map 能让你再报错时，定位到源代码的位置
    devtool: 'eval-source-map'  

};