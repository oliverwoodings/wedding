const config = require('config')

module.exports = {
  client: 'mysql',
  connection: {
    ...config.mysql
  },
  useNullAsDefault: true
}
