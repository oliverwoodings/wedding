const knex = require('../knex')

module.exports = async function getUser (codeOrEmail) {
  return await knex('users')
}
