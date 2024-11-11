import Entry from './entry'
import { fetchSource } from './widget'

export const appInstance = new Map()

class AppManager {
    status = 'started'
    url: String = ''
    name: String = ''
    container
    entry

    constructor (name, url, container) {
        this.url = url
        this.name = name
        this.container = container
        this.entry = new Entry(url)
    }

    async create () {
        const htmlString = await fetchSource(this.url)
        this.entry.loadHtml(htmlString)
    }

    mount () {
        const cloneHtml: HTMLElement = this.entry.html.cloneNode(true)
        const fragment = document.createDocumentFragment()
        Array.from(cloneHtml.childNodes).forEach(node => {
            fragment.appendChild(node)
        })
        this.container.appendChild(fragment)
    }
}

export default AppManager
