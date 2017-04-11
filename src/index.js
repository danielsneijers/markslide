const fs = require('fs')
const path = require('path')
const marked = require('marked')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  const sheetsPath = path.resolve(__dirname, '../sheets.md')
  const sheetsContent = fs.readFileSync(sheetsPath, 'utf8')

  res.send(marked(sheetsContent))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
