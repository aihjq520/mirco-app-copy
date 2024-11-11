<template>
    <keep-alive>
        <div class="micro-widget" ref="mountNode" :style="{'min-height': minHeight + 'px'}">
            <div class="micro-widget-error" v-if="$slots.error && isError">
                <slot name="error"></slot>
            </div>
        </div>
    </keep-alive>
</template>

<script>

    export default {
        name: 'micro-widget',
        props: {
            name: {
                type: String,
                default: ''
            },
            appCode: {
                type: String,
                default: ''
            },
            host: {
                type: String,
                default: ''
            },
            chunkDir: {
                type: String,
                default: ''
            },
            assets: {
                type: [String, Array],
                default() {
                    return []
                }
            },
            runtime: {
                type: Object,
                default() {
                    return {}
                }
            },
            params: {
                type: Object,
                default() {
                    return {}
                }
            },
            beforeMount: {
                type: Function
            },
            minHeight: {
                type: [String, Number],
                default: 200
            }
        },
        data() {
            return {
                isError: false
            }
        },
        mounted() {
            
        },
        destroyed() {
           
        }
    }
</script>
