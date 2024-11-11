在使用插件时，通过传入自定义配置项，配置不同的页面作为微件

## Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 具有唯一标识的name值 | String | —— | '' |
| appCode | 所属产品的appCode | String | —— | '' |
| host | 所属产品的主机 | String | —— | '' |
| assets | 静态资源（css&js）相对路径 | Array / String | —— | [] |
| runtime | 依赖的环境 | Object | {vuex: vuex, vue: vue, 'vue-router': vue-router, ...} | {} |
| params | 传给子页面（微件）的参数集（prop） | Object | —— | {} |
| min-height | 组件最小高度 | Number / String | —— | 200 |

## 配置示例
```javascript
data() {
    return {
        name: 'home_first',
        appCode: 'python3-vue',
        host: 'http://localhost:5200/',
        assets: [
            'static/dist_micro/js/home_first.js',
            'static/dist_micro/css/home_first.css'
        ],
        runtime: {},
        params: {
            apiPrefix: 'http://yapi.canway.top/mock/1013/api/' // 微件接口前缀
        }
    }
}
```
### 可用事件

| 事件名 | 说明 | 参数说明 |
|------|------|------|
| success | 微件加载成功回调事件 | -- |
| fail | 微件加载失败回调事件 | -- |


### 插槽

| name | 说明 | 参数说明 |
|------|------|------|
| fail  | 微件加载失败时的插槽 |

