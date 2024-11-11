<template>
    <div class="markdown-block">
        <div class="content" v-html="htmlStr"></div>
    </div>
</template>
<script>
    import MarkdownIt from 'markdown-it'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/github.css'

    export default {
        name: 'MarkdownBlock',
        props: {
            markdown: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                htmlStr: ''
            }
        },
        watch: {
            markdown (val, oldVal) {
                if (val !== oldVal) {
                    this.convertHTML(val)
                }
            }
        },
        created () {
            this.convertHTML(this.markdown)
        },
        methods: {
            convertHTML (value) {
                const md = new MarkdownIt({
                    highlight (str, lang) {
                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                return `${hljs.highlight(lang, str, true).value}`
                            } catch (__) {
                            }
                        }

                        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
                    }
                })
                this.htmlStr = md.render(value)
            }
        }
    }
</script>
<style lang="scss">
    .content {
        font-size: 14px;
        color: #5e6d82;
        pre {
            display: block;
            color: #888;
            line-height: 1.8;
            font-family: Menlo,Monaco,Consolas,Courier,monospace;
            font-size: 14px;
            padding: 15px;
            background-color: #f9fafc;
            border: 1px solid #f0f0f0;
            word-break: break-all;
            overflow: auto;
        }

        .hljs {
            display: block;
            overflow-x: auto;
            padding: 15px;
            background: #f9fafc;
        }

        .hljs-addition,
        .hljs-meta,
        .hljs-string,
        .hljs-symbol,
        .hljs-template-tag,
        .hljs-template-variable {
            color: #756bb1
        }

        .hljs-comment,
        .hljs-quote {
            color: #636363
        }

        .hljs-bullet,
        .hljs-link,
        .hljs-literal,
        .hljs-number,
        .hljs-regexp {
            color: #31a354
        }

        .hljs-deletion,
        .hljs-variable {
            color: #88f
        }

        .hljs-built_in,
        .hljs-doctag,
        .hljs-keyword,
        .hljs-name,
        .hljs-section,
        .hljs-selector-class,
        .hljs-selector-id,
        .hljs-selector-tag,
        .hljs-strong,
        .hljs-tag,
        .hljs-title,
        .hljs-type {
            color: #3182bd
        }
        .hljs-attr {
            color: #606;
        }

        .hljs-emphasis {
            font-style: italic
        }

        .hljs-attribute {
            color: #e6550d
        }
        table {
            border-collapse: collapse;
            width: 100%;
            background-color: #fff;
            color: #5e6d82;
            font-size: 14px;
            margin-bottom: 45px;
            line-height: 1.5em;
        }
        h1, h2, h3, h4, h5, h6 {
            font-weight: 400;
            color: #1f2f3d;
        }
        p {
            line-height: 1.5em;
        }
        table {
            th,td {
                padding: 10px;
                max-width: 250px;
                border-bottom: 1px solid #eaeefb;
                &:first-child {
                    padding-left: 10px;
                }
            }
            th {
                text-align: left;
                border-top: 1px solid #eaeefb;
                background-color: #eff2f7;
                white-space: nowrap;
            }
        }
    }
</style>
