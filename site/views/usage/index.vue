<template>
    <div>
        <h2 class="content-title">使用说明</h2>
        <div class="content-wrapper">
            <micro-app name="app" url="http://www.baidu.com"></micro-app>
        </div>
    </div>
</template>
<script>
    // import MarkdownBlock from '@/components/MarkdownBlock.vue'
    import doc from './doc.md'
    import '../../../lib'
    export default {
        name: 'CustomUsage',
        components: {
          
        },
        data () {
            return {
                doc
            }
        }
    }
</script>
