const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'eval-source-map',
    entry : path.join(_dirname,'src/main.js'),
    output: {
        path : path.join(_dirname,'dist'),
        filename:'bundle.js'
    },
    devServer : {
        contentBase : './static',
        historyApiFallback:true,
        inline : true,
        compress: true,
        port : 8080,
        hot : true
    },
    module : {
        rules : [
            {
                test:/\/html$/,
                use : 'html-loader'
            },
            {
                test : /\.css$/,
                use :ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use : 'css-loader'
                })
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader: 'babel-loader'
            },
            {
                test:/\.(scss|sass)$/,
                use : ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    user: [
                        {
                            loader:'css-loader',
                            options: {
                                url:false,
                                minimize:true,
                                sourcemap:true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourcemap:true
                            }
                        }
                    ]
                })
            },
            {
                test:/\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/, // 打包字体文件
                use: 'file-loader'
            },
            {
                test : /\.(png|jpe?g|gif)(\?.*)?$/, // 打包图片资源
                use:'url-loader?limit=8192&name=images/[hash].[name].[ext]'
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(), // 热重载
        new HtmlWebpackPlugin({
            title: 'Generator',
            filename:'./index.html',
            template: 'src/index.html',
            favicon: 'favicon.ico',
            inject:'body',
            hash:true
        }),
        // 引入以作为其他插件的依赖
        // new webpack.ProvidePlugin({
        //     $:'jquery',
        //     jQuery:'jquery'
        // }),

        new ExtractTextPlugin('style.css') // 将样式文件抽离单独打包
    ]
}