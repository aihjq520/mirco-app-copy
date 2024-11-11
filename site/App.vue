<template>
    <div id="mygraph-page">
        <Navigator></Navigator>
        <main class="main-content">
            <router-view class="content-wrapper"></router-view>
        </main>
    </div>
</template>
<script>
    import Navigator from '@/components/Navigator.vue'

    export default {
        name: 'App',
        components: {
            Navigator
        }
    }
</script>
<style lang="scss">
    #mygraph-page {
        width: 100%;
        margin-top: 64px;
    }
    .main-content {
        position: relative;
        margin-left: 250px;
        padding: 30px;
        width: calc(100% - 250px);
        min-width: 950px;
        height: calc(100vh - 64px);
        .content-wrapper {
            padding-bottom: 30px;
        }
        .content-title {
            margin: 0 0 20px;
            padding-bottom: 7px;
            line-height: 1;
            font-size: 24px;
            font-weight: 400;
            color: #333333;
            border-bottom: 1px solid #eeeeee;
        }
        .markdown-block {
            img {
                max-width: 800px;
                border-radius: 4px;
            }
        }
    }
</style>
