<template>
    <div class="change-log-page">
        <h2 class="content-title">更新日志</h2>
        <div class="content-wrapper">
            <markdown-block :markdown="doc"></markdown-block>
        </div>
    </div>
</template>
<script>
    import MarkdownBlock from '@/components/MarkdownBlock.vue'
    import doc from './doc.md'

    export default {
        name: 'ChangeLog',
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
<style lang="scss" scoped>
    .change-log-page {
        /* magicbox 主页样式 */
        ::v-deep {
            h3 {
                margin: 45px 0 15px;
            }
            h6 {
                margin: 0;
                margin-bottom: -10px;
                font-style: italic;
            }
            ul {
                padding: 10px 30px 15px 20px;
                li {
                    font-size: 14px;
                    list-style: none;
                    padding-left: 20px;
                    padding-bottom: 5px;
                    color: #333;
                    word-break: break-all;
                    &:before {
                        content: "";
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background-color: #333;
                        transform: translateX(-15px);
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
            hr {
                background: #c3cdd7;
                width: 100%;
                height: 1px;
                border: none;
            }
            em {
                font-size: 12px;
                margin-left: 15px;
            }
        }
        
    }
</style>
