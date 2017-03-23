/*
 需求点

 */
var webpack = require('webpack');
var path = require('path');
// 离线缓存
//var AppCachePlugin = require('appcache-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//定义了一些文件夹的路径

var ROOT_PATH = path.resolve(__dirname);
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
// var COMMON_PATH = path.resolve(SRC_PATH, 'common');

// function assetsPath(_path) {
//     var assetsSubDirectory = process.env.NODE_ENV === 'production'
//         ? config.build.assetsSubDirectory
//         : config.dev.assetsSubDirectory
//     return path.posix.join(assetsSubDirectory, _path)
// }

module.exports = {
    // 启用source-map
    // devtool: 'eval-source-map',
    // devtool: "source-map",
    // devtool: 'inline-source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        //api代理
        // proxy: {
        //     '/api': {
        //         target: 'http://api.sit.vveshow.com/buy/api/v1/w1/linkin/mall/info',
        //         secure: false
        //     }
        // }
        // http://t.api.ddxq.mobi/public/getGrouponList?page=1&size=50&village=&tag=&jsonp_callback=jsonp1&_=1476030185008
    },

    // 入口
    entry: {
        webpackHot: 'webpack/hot/only-dev-server',
        webpackServer: 'webpack-dev-server/client?http://localhost:8080',
        index: path.resolve(SRC_PATH, './index/index.js'),
        platform: path.resolve(SRC_PATH, './platform/index.jsx'),
        admin: path.resolve(SRC_PATH, './marketing/index.jsx'),
        content: path.resolve(SRC_PATH, './content/index.jsx'),
        h5: path.resolve(SRC_PATH, './h5/index.jsx'),
        examples: path.resolve(SRC_PATH, './examples/index.jsx'),
        lib: ['react', 'react-dom']
    },

    // 输出
    output: {
        path: DIST_PATH,
        //filename: '[name].[hash:6].js',
        filename: 'asset/[name].[hash:6].js',
        // cdn地址
        publicPath: ''
    },
    // 模块
    module: {
        loaders: [
            /*{
             test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg)$/,
             loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
             },*/
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'asset/[name].[hash:6].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'asset/[name].[hash:6].[ext]'
                }
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                exclude: path.resolve(SRC_PATH, 'asset'),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }, {
                test: /\.ts[x]?$/,
                loader: "ts-loader"
            }, {
                test: /\.js[x]?$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react&plugins[]=transform-decorators-legacy',
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },


    // 声明外部依赖,已存在的全局变量转化为模块
    externals: {
        // var LK = require('LK');
        'LK': 'LK',

        // var $ = require('jquery');
        // jquery: 'jQuery',

        // import artTemplate from 'artTemplate';
        // artTemplate: 'template',
    },
    /*
     absolute path: require("/home/me/file") require("C:\\Home\\me\\file")
     relative path: require("../src/file")   require("./file")
     module   path: require("module")        require("module/lib/file")
     */
    // 定义模块别名
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.vue', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // 定义目录别名, 对应的模块引用可以为 common/config,common/util,common/http
            'common': path.resolve(SRC_PATH, './common'),
            // 定义模块别名
            'config': path.resolve(SRC_PATH, './common/config'),
            //'vue$': 'vue/dist/vue',
        }
    },
    // 插件
    plugins: [
        // 把模块默认插入到全局模块中,不用一个个导入,在模块内可以直接使用
        new webpack.ProvidePlugin({
            React: 'react'
        }),

        // 配置代码自动编译和热替换插件
        new webpack.HotModuleReplacementPlugin(),

        // 压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        // OccurenceOrderPlugin webpack为每个模块指定唯一的id，通过该插件，webpack会分析和为模块按优先级排序，为最经常使用的分配一个最小的ID

        // TODO:
        new webpack.optimize.DedupePlugin(),

        // TODO:
        // new ExtractTextPlugin("asset/[name].[contenthash:6].css"),

        // 定义系统全局变量, 如何定义自定义的系统全局变量
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
            PRODUCTION: JSON.stringify(true),
            __VERSION__: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        }),

        // TODO:自定义公共模块提取

        // new CommonsChunkPlugin('init.js'),
        // new CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
        // new CommonsChunkPlugin({
        //     name: "common",
        //     // // (the commons chunk name)
        //     //
        //     filename: "common.js",
        //     // // (the filename of the commons chunk)
        //     //
        //     minChunks: 2,
        //     // // (Modules must be shared between 3 entries)
        //     //
        //     // chunks: ["vendor"],
        //     // // (Only use these entries)
        // }),

        // new CommonsChunkPlugin("commons1.js", ["sso", "home"]),
        // new CommonsChunkPlugin("commons2.js", ["marketing", "platform", "commons1.js"])


        // TODO:动态生成html入口页面
        new HtmlWebpackPlugin({
            hash: false,
            title: 'index',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'index.html'),
            chunks: ['lib', 'index'],
            inject: true
        }),

        new HtmlWebpackPlugin({
            // 是否在所有asset上生成hash清理缓存
            hash: false,
            title: 'marketing',
            filename: 'marketing.html',
            favicon: path.join(SRC_PATH, 'favicon.ico'),
            // 模板路径
            template: path.resolve(SRC_PATH, 'marketing.html'),
            // 依赖的模块
            chunks: ['lib', 'marketing'],
            // 是否注入asset到head和body中
            inject: true
        }),

        new HtmlWebpackPlugin({
            // 是否在所有asset上生成hash清理缓存
            hash: false,
            title: 'platform',
            filename: 'platform.html',
            favicon: path.join(SRC_PATH, 'favicon.ico'),
            // 模板路径
            template: path.resolve(SRC_PATH, 'platform.html'),
            // 依赖的模块
            chunks: ['lib', 'platform'],
            // 是否注入asset到head和body中
            inject: true
        }),

        new HtmlWebpackPlugin({
            // 是否在所有asset上生成hash清理缓存
            hash: false,
            title: 'examples',
            filename: 'examples.html',
            favicon: path.join(SRC_PATH, 'favicon.ico'),
            // 模板路径
            template: path.resolve(SRC_PATH, 'examples.html'),
            // 依赖的模块
            chunks: ['lib', 'examples'],
            // 是否注入asset到head和body中
            inject: true
        }),

        new HtmlWebpackPlugin({
            // 是否在所有asset上生成hash清理缓存
            hash: false,
            title: 'content',
            filename: 'content.html',
            favicon: path.join(SRC_PATH, 'favicon.ico'),
            // 模板路径
            template: path.resolve(SRC_PATH, 'content.html'),
            // 依赖的模块
            chunks: ['lib', 'content'],
            // 是否注入asset到head和body中
            inject: true
        }),

        new HtmlWebpackPlugin({
            // 是否在所有asset上生成hash清理缓存
            hash: false,
            title: 'h5',
            filename: 'h5.html',
            favicon: path.join(SRC_PATH, 'favicon.ico'),
            // 模板路径
            template: path.resolve(SRC_PATH, 'h5.html'),
            // 依赖的模块
            chunks: ['lib', 'h5'],
            // 是否注入asset到head和body中
            inject: true
        }),

        // new AppCachePlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8090'
        })
    ],
    vue: {
        loaders: {
            js: 'babel-loader?presets[]=es2015',
            css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
            sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }
    }
};
