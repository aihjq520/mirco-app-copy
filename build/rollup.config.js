const path = require('path')
// 提供babel能力
const { babel } = require('@rollup/plugin-babel')
// 解析 node_modules 中的模块，帮助 Rollup 查找外部模块，然后导入
const nodeResolve = require('@rollup/plugin-node-resolve')
// 将CommonJS模块转换为 ES2015 供 Rollup 处理
const commonjs = require('@rollup/plugin-commonjs')
// vue SFC单文件组件处理
const vue = require('rollup-plugin-vue')
// 提取css为单独文件
// const css = require('rollup-plugin-css-only')
// 代码压缩
const { terser: rollupTerser } = require('rollup-plugin-terser')

const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath)
}

module.exports = [
    {
        input: resolveFile('lib/index.js'),
        output: {
            file: resolveFile('dist/index.js'),
            sourcemap: true,
            // amd – 异步模块定义，用于像RequireJS这样的模块加载器
            // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
            // es – 将软件包保存为ES模块文件
            // iife – 一个自动执行的功能，适合作为<script>标签引入
            // umd – 通用模块定义，以amd，cjs 和 iife 为一体
            format: 'es',
            name: 'micro-widget'
        },
        //  g6从包中剔除
        external: ['vue', 'vue-router', 'vuex'],
        plugins: [
            vue({
                css: true
            }),
            // css(), // 同时vue css设置为false，才可应用
            nodeResolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            }),
            rollupTerser()
        ]
    }
]
