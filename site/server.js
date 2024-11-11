const express = require('express')
const app = express()

app.use(express.static(__dirname + '/dist'))

app.get('/', function(req, res) {
    res.sendFile('dist/index.html', { root: __dirname })
})

app.listen(5000, function () {
    console.log('servering at port 5000')
})