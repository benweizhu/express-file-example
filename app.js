const express = require('express')
const path = require('path')
const app = express()

app.get('/download/:id', function (req, res) {
  res.sendFile(path.resolve(__dirname, `files/${req.params.id}.pdf`))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})