const path =  require('path');
//html
const HtmlWebpackPlugin = require('html-webpack-plugin');

//css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require( 'copy-webpack-plugin');
const CssMinizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//Variables de entorno
const Dotenv = require('dotenv-webpack');





 module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: '[name],[contenthash].js', 
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@templates': path.resolve(__dirname,'src/templates'),
          '@styles': path.resolve(__dirname,'src/styles'),
          '@images': path.resolve(__dirname,'src/assets/images'),
        }
    },
    module:{
        rules: [
            {
                test:/\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            },
            {
                test:/\.png/,
                type: 'asset/resource'
            },
            {
                test:/\.(woff|woff2)$/i,
                type: 'asset/resource'
                // use:{
                //     loader: 'file-loader',
                    
                
                //     Options: {
                //         limit: 10000,
                //         mimetype: 'application/font-woff',
                //         name:'[name].[ext]',
                //         outputPath: './assets/fonts/',
                //         publicPath: './assets/fonts/',
                //         esModule: false,

                //     },
                // }
            },
            
            
           
            
            
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template:'./public/index.html',
            filename:'./index.html'

        }),
        new MiniCssExtractPlugin({
            filename: './main.css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        
    
        
    ],
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinizerPlugin(),
            new TerserPlugin(),
        ]
    }
    
    
}