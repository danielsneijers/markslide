import React from 'react'
import { renderToString } from 'react-dom/server'
import template from './template'
import App from './components/App'

function render (req, res, content) {
  const appString = renderToString(<App content={content} />)

  res.send(template({
    body: appString,
    title: 'FROM THE SERVER'
  }))
}

export default render
