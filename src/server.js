import fs from 'fs'
import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { parse } from './utils/markdown'
import template from './template'
import App from './components/App'

const app = express()

app.get('/', (req, res) => {
  const sheetsPath = path.resolve(__dirname, '../sheets.md')
  const sheetsContent = fs.readFileSync(sheetsPath, 'utf8')
  const sheets = parse(sheetsContent)
  const appString = renderToString(<App>{sheets}</App>)

  res.send(template({
    body: appString,
    title: 'Hello World from the server'
  }))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
