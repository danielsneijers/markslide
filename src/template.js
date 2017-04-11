export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="main.css">
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/client.js"></script>
    </html>
  `
}
