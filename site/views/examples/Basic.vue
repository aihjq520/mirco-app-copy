<template>
    <div>
        <h2 class="content-title">基础使用</h2>
        <p>这是一个远程的页面</p>
        <div style="border: 1px solid #ddd;" v-bkloading="{ isLoading: loading, zIndex: 10 }">
            <micro-widget
                :name="name"
                :app-code="appCode"
                :host="host"
                :assets="assets"
                :runtime="runtime"
                :params="params"
                :min-height="200"
                @success="success"
                @fail="fail">
                <div slot="error">
                    <bk-exception class="exception-wrap-item" type="404">
                        <span>页面不存在</span>
                    </bk-exception>
                </div>
            </micro-widget>
        </div>
    </div>
</template>
<script>
    import MicroWidget from '../../../lib'
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import Vuex from 'vuex'
    import bkMagic from 'bk-magic-vue'
    import * as Echarts from 'echarts'

    // 全量引入 bk-magic-vue 样式
    import 'bk-magic-vue/dist/bk-magic-vue.min.css'
    Vue.use(bkMagic)
    Vue.use(Echarts)
    Vue.use(MicroWidget)
    Vue.prototype.$echarts = Echarts
    export default {
        name: 'Basic',
        data () {
            return {
                name: 'home_first',
                appCode: 'python3-vue',
                // host: 'https://paas.cwbk.com/t/python3_vue_saas/',
                host: 'http://localhost/',
                assets: [
                    'static/dist_micro/js/home_first.js',
                    'static/dist_micro/css/home_first.css'
                ],
                runtime: {
                    vue: Vue,
                    'vue-router': VueRouter,
                    vuex: Vuex
                },
                params: {
                    apiPrefix: 'http://yapi.canway.top/mock/1013/api/'
                },
                loading: true
            }
        },
        methods: {
            success () {
                this.loading = false
            },
            fail () {
                this.loading = false
            }
        }
    }
</script>
<style lang="scss" scoped>
.code-box {
    font-size: 14px;
    color: #606;
    background-color: #f9fafc;
}
</style>
