<template>
    <section class="navigator">
        <h3 class="title">MicroWidget（微挂件）</h3>
        <ul class="nav-section summary-list">
            <li><router-link :to="{ name: 'usage' }">使用说明</router-link></li>
            <li><router-link :to="{ name: 'options' }">配置项</router-link></li>
            <li><router-link :to="{ name: 'change-log' }">更新日志</router-link></li>
        </ul>
        <!-- <h4 class="example-title">示例</h4>
        <ul class="nav-section example-list">
            <li>
                <router-link :to="{ name: 'basic' }">基础使用</router-link>
            </li>
        </ul> -->
    </section>
</template>
<script>
    export default {
        name: 'Navigator'
    }
</script>
<style lang="scss" scoped>
    @import '../assets/css/mixins/scroller.css';
    ol, ul {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }

    .navigator {
        position: fixed;
        top: 64px;
        bottom: 0;
        left: 0;
        width: 250px;
        border-right: 1px solid #eeeeee;
        background: #ffffff;
        z-index: 1;
    }
    .title {
        margin: 0;
        padding: 18px 20px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
    }
    .nav-section {
        padding: 20px 0;
        > li {
            font-size: 14px;
            line-height: 40px;
            > a {
                display: block;
                padding-left: 20px;
                color: #63656e;
                text-decoration: none;
                &.router-link-exact-active {
                    color: #2d8cf0;
                    background-color: #f0faff;
                }
                :hover {
                    background-color: #f0f1f5;
                }
            }
        }
    }
    .summary-list {
        border-bottom: 1px solid #eee;
    }
    .example-title {
        margin: 20px 0 0;
        padding-left: 20px;
        line-height: 1;
        font-size: 18px;
        font-weight: normal;
        color: #333333;
    }
</style>
