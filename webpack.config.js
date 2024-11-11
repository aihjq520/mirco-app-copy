const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

let webpackConf = {}
const baseConf = {
    mode: process.env.NODE_ENV,
    entry: {
        index: './site/index.js'
    },
    output: {
        path: path.posix.join(__dirname, './site/dist'),
        publicPath: '',
        filename: 'js/[name].[hash:10].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './site')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.tsx?$/, // .ts或者tsx后缀的文件，就是typescript文件
                loader: ['babel-loader', 'ts-loader'], // 就是上面安装的ts-loader
                exclude: '/node-modules/' // 排除node-modules目录
            },
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.md$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 3.0.0 版本默认使用 esModule，导致 css 中使用 url 的地方编译后错误输出 [object Module]
                    // 参考 https://github.com/vuejs/vue-loader/issues/1612
                    esModule: false,
                    limit: 10000,
                    name: path.posix.join('images/[name].[hash:7].[ext]'),
                    publicPath: './'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: path.posix.join('media/[name].[hash:7].[ext]'),
                    publicPath: './'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: path.posix.join('fonts/[name].[hash:7].[ext]'),
                    publicPath: './'
                }
            }
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './site/index.html',
            inject: true
        })
    ]
}

if (isProd) {
    webpackConf = merge(baseConf, {
        plugins: [
            new MiniCssExtractPlugin({
                filename: path.posix.join('css/[name].[hash:10].css')
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    extractComments: false
                })
            ],
            splitChunks: {
                cacheGroups: {
                    vueLib: {
                        test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
                        name: 'vue-lib',
                        priority: 10,
                        chunks: 'initial'
                    }
                }
            },
            runtimeChunk: {
                name: 'manifest'
            }
        }
    })
} else {
    webpackConf = merge(baseConf, {
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.posix.join(__dirname, '../static'),
            host: 'localhost',
            port: 7000,
            https: false,
            hot: true,
            open: false,
            overlay: true,
            proxy: {
                '/static/dist_micro': {
                    target: 'https://paas.cwbk.com/t/python3_vue_saas//static/dist_micro',
                    secure: false,
                    changeOrigin: true
                }
            },
            stats: {
                children: false,
                entrypoints: false,
                modules: false
            },
            before (app) {
                app.use((req, res, next) => {
                    // set cors for all served files
                    res.set('Access-Control-Allow-Origin', '*')
                    next()
                })
            }
        }
    })
}

module.exports = webpackConf
