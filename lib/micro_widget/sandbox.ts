// get function from original window, such as scrollTo, parseInt
function isWindowFunction (func) {
    return func && typeof func === 'function'
}
  
class SandBox {
    fakeWindow
    addKeyMap = new Map()
    // modifyKeyMap = new Map()
    sandbox = null
    releaseEffect = null
    constructor () {
        this.fakeWindow = Object.create(null)
        const originWindow = window
        const { addKeyMap } = this
        this.sandbox = new Proxy(this.fakeWindow, {
            get (target, key) {
                if (Reflect.has(target, key)) {
                    return Reflect.get(target, key)
                }

                const rawValue = Reflect.get(originWindow, key)
                if (isWindowFunction(rawValue)) {
                    return rawValue.bind(originWindow)
                }
                return rawValue
            },
            set (target, key, value) {
                // eslint-disable-next-line no-prototype-builtins
                if (!originWindow.hasOwnProperty(key)) {
                    addKeyMap.set(key, value)
                }
                target[key] = value
                return true
            },
            deleteProperty (target, p) {
                // eslint-disable-next-line no-prototype-builtins
                if (target.hasOwnProperty(p)) {
                    Reflect.deleteProperty(target, p)
                }
                return true
            }
        })
        this.releaseEffect = effect(this.sandbox)
        return this.sandbox
    }

    start () {

    }

    stop () {
        // 清空Map
        this.addKeyMap.forEach(key => {
            Reflect.deleteProperty(this.sandbox, key)
        })
        this.addKeyMap.clear()
        this.releaseEffect()
    }
}

// 记录addEventListener、removeEventListener原生方法
const rawWindowAddEventListener = window.addEventListener
const rawWindowRemoveEventListener = window.removeEventListener

/**
 * 重写全局事件的监听和解绑
 * @param microWindow 原型对象
 */
function effect (microWindow) {
    // 使用Map记录全局事件
    const eventListenerMap = new Map()

    // 重写addEventListener
    microWindow.addEventListener = function (type, listener, options) {
        const listenerList = eventListenerMap.get(type)
        // 当前事件非第一次监听，则添加缓存
        if (listenerList) {
            listenerList.add(listener)
        } else {
            // 当前事件第一次监听，则初始化数据
            eventListenerMap.set(type, new Set([listener]))
        }
        // 执行原生监听函数
        return rawWindowAddEventListener.call(window, type, listener, options)
    }

    // 重写removeEventListener
    microWindow.removeEventListener = function (type, listener, options) {
        const listenerList = eventListenerMap.get(type)
        // 从缓存中删除监听函数
        if (listenerList?.size && listenerList.has(listener)) {
            listenerList.delete(listener)
        }
        // 执行原生解绑函数
        return rawWindowRemoveEventListener.call(window, type, listener, options)
    }

    // 清空残余事件
    return () => {
        console.log('需要卸载的全局事件', eventListenerMap)
        // 清空window绑定事件
        if (eventListenerMap.size) {
            // 将残余的没有解绑的函数依次解绑
            eventListenerMap.forEach((listenerList, type) => {
                if (listenerList.size) {
                    for (const listener of listenerList) {
                        rawWindowRemoveEventListener.call(window, type, listener)
                    }
                }
            })
            eventListenerMap.clear()
        }
    }
}

export default SandBox
