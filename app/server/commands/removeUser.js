const knex = require('../knex')

module.exports = async function removeUser (userId) {
  await knex('users').where('id', userId).del()
}
