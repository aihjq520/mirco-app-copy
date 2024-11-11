import SandBox from './sandbox'
import {fetchSource} from './widget'

class Entry {
    scriptMap: Map<string, string>
    cssMap: Map<string, string>
    linkMap: Map<string, string>
    html: HTMLElement
    baseUrl = ''
    constructor (baseUrl: string) {
        this.cssMap = new Map()
        this.scriptMap = new Map()
        this.linkMap = new Map()
        this.baseUrl = baseUrl
    }

    loadHtml(html: string) {
        html = html
        .replace(/<head[^>]*>[\s\S]*?<\/head>/i, (match) => {
          // 将head标签替换为micro-app-head，因为web页面只允许有一个head标签
          return match
            .replace(/<head/i, '<micro-app-head')
            .replace(/<\/head>/i, '</micro-app-head>')
        })
        .replace(/<body[^>]*>[\s\S]*?<\/body>/i, (match) => {
          // 将body标签替换为micro-app-body，防止与基座应用的body标签重复导致的问题。
          return match
            .replace(/<body/i, '<micro-app-body')
            .replace(/<\/body>/i, '</micro-app-body>')
        })
  
      // 将html字符串转化为DOM结构
      const htmlDom = document.createElement('div')
      htmlDom.innerHTML = html
      this.html = htmlDom
      this.collectScriptAndCss(htmlDom)
    }

    collectScriptAndCss (dom: HTMLElement) {
        if (dom.children.length) {
            for (let i = 0; i < dom.children.length; i++) {
                this.collectScriptAndCss((dom.children[i]) as HTMLElement)
            }
        }

        if (dom instanceof HTMLScriptElement) {
            this.collectScripts(dom)
        } else if (dom instanceof HTMLStyleElement) {
            console.log(dom, '这是style标签')
        } else if( dom instanceof HTMLLinkElement) {
            console.log(dom, '这是link标签')
        }
    }

    async collectScripts (dom: HTMLScriptElement) {
        const src = dom.getAttribute('src')
        if(src) {
            let scriptContent = ''
            if(src.startsWith('http')){
                scriptContent = await fetchSource(src)
                this.scriptMap.set(src, scriptContent)
            } else {
                scriptContent = await fetchSource(this.baseUrl + src)
                // this.scriptMap()
            }
            
            this.exexcuteScript(scriptContent)
        }
    }

    collectCss () {
        
    }

    collectLink () {
        
    }

    transformCode(code: string): string {
        // if (app.sandBox) {
          return `
              console.log(window)
              with(window) {
                  try {
                    ${code}
                  }
                  catch(e) {
                    console.error(e)
                  }
                }
          `;
        // }
        // return this.code;
    }

    exexcuteScript(code: string){
        const sandxBox = new SandBox()
        const scopedCode = this.transformCode(code)
        try {
            new Function('window', scopedCode)(sandxBox)
        } catch(e){
            console.log(e)
        }
    }
}

export default Entry
