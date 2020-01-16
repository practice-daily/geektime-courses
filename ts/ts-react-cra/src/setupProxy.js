const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/api/**/*/*.action', {
    // http://localhost:4000/employee/getEmployee.json
    target: 'http://localhost:4000',
    pathRewrite(path) {
      return path.replace('/api', '/').replace('.action', '.json')
    }
  }))
}
