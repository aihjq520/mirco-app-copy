
export function fetchSource (url) {
    return fetch(url).then((res) => {
        return res.text()
    })
}
