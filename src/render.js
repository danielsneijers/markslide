import React from 'react'
import { renderToString } from 'react-dom/server'
import template from './template'
import { StaticRouter } from 'react-router'
import Routes from './routes'

function render (req, res, content) {
  const context = {}
  const appString = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Routes />
    </StaticRouter>
  )

  res.send(template({
    body: appString,
    title: 'FROM THE SERVER'
  }))
}

export default render
