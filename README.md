MicroWidget 这是一个演示组件

## 本地开发
``` shell
npm install
npm run dev
```

## 组件构建
``` shell
npm run build
```

## 组件主站构建
``` shell
build:site
```

## 开发者中心（v3）运行
``` shell
npm run online
```

## 安装
```shell
npm install --save @canway/micro-widget
```


## 引入

```javascript
import MicroWidget from '@canway/micro-widget'
Vue.use(MicroWidget)
```

## 基础使用

下面是在 vue 组件中使用 MicroWidget 组件的一个简单例子

### **基座应用**

``` html
<!-- 模板部分 -->
<template>
    <micro-widget
        :name="name"
        :app-code="appCode"
        :host="host"
        :assets="assets"
        :runtime="runtime"
        :params="params">
    </micro-widget>
</template>
```

``` javascript
// script 部分
export default {
    name: 'Basic',
    data () {
        return {
            name: 'myAlarm',
            appCode: 'uac',
            host: 'http://localhost:5200/',
            assets: [
                'static/dist_micro/js/home_first.js',
                'static/dist_micro/css/home_first.css'
            ],
            runtime: {},
            params: {
                apiPrefix: 'http://yapi.canway.top/mock/1013/api/'
            }
        }
    }
}
```
### **子应用**
子应用打包引用文件
```js
import Vue from 'vue'
// 需要提供页面的引入
import myAlarm from '../myAlarm.vue'
import api from '@/api'
import store from '@/store/index'
import axios from 'axios'
// 公共函数或者公共样式的引入
import '@/controller/func/common'

let instance = null

// 声明 mount 生命周期
export function mount(component, targetNode, props) {
    Vue.prototype.$api = api
    Vue.mixin({
        beforeCreate() {
            this.$options._base = Vue
        }
    })
    window.siteUrl = props.apiPrefix + (props.apiPrefix.endsWith('/') ? '' : '/')
    window.authApp = 'WEOPS'
    // 为保证能够全局共享vuex，需在此处将vuex存入window，定义格式`${appCode}_store`
    window.uac_store = store
    axios.defaults.baseURL = props.apiPrefix
    component.store = store
    instance = new Vue(component).$mount(targetNode)
}

// 声明 unmount 生命周期
export function unmount(targetNode) {
    instance && instance.$destroy()
}

export default myAlarm


```

## 注意点
### 弹出层
magicbox具备的以下弹出层类组件
+ Dialog 对话框
+ Sideslider 侧栏
+ Popover 弹出框提示
+ Popconfirm 弹出确认框
+ Select 下拉选框的**弹出层**

默认使用下，由于以上弹出层的html层级独立于`MicroWidget`层级，若弹出层包含自定义嵌入式样式或者外联式样式会导致样式不生效。
解决方法：在子应用弹出层组件中添加`ext-cls`属性（下拉框的弹出层则使用`ext-popover-cls`），属性值为`.micro-app-${pageName}`，pageName为当前页面的名称即以上示例中`micro-widget`中的name。

示例：嵌入myAlarm页面的弹窗组件需添加属性：`ext-cls=".micro-app-myAlarm"`

### Vuex
为保证在基座应用中子应用的vuex能够全局共享，需要在子应用打包配置文件中将vuex存入window，格式为`${appCode}_store`
示例：`window.uac_store = store`
