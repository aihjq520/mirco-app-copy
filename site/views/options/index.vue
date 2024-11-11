<template>
    <div>
        <h2 class="content-title">配置项</h2>
        <div class="content-wrapper">
            <markdown-block :markdown="doc"></markdown-block>
        </div>
    </div>
</template>
<script>
    import MarkdownBlock from '@/components/MarkdownBlock.vue'
    import doc from './doc.md'

    export default {
        name: 'Options',
        components: {
            MarkdownBlock
        },
        data () {
            return {
                doc
            }
        }
    }
</script>
