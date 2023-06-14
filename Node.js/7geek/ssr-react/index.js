require('@babel/register')({
  presets: ['@babel/preset-react']
})

const ReactDOMServer = require('react-dom/server')

const html = ReactDOMServer.renderToString(
  require('./index.jsx')
)

console.log(html)
