import fs from 'fs'
import path from 'path'
import express from 'express'
// import webpack from 'webpack'
// import webpackConfig from '../webpack/webpack.config.dev-client'
import { parse } from './utils/markdown'

// const middleware = require('webpack-dev-middleware')
const render = require('../dist/render')

const app = express()
// const compiler = webpack(webpackConfig)

// app.use(middleware)(compiler, {
//   noInfo: true,
//   publicPath: webpackConfig.output.publicPath
// })
app.use(express.static('dist'))

const sheetsPath = path.resolve(__dirname, '../sheets.md')
const sheetsContent = fs.readFileSync(sheetsPath, 'utf8')
const sheets = parse(sheetsContent)

const curriedRender = (content) => (req, res) => render.default(req, res, content)
const renderWithSheets = curriedRender(sheets)

app.get('/', renderWithSheets)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
