const knex = require('../knex')
const getUserById = require('../queries/getUserById')

module.exports = async function updateUser (userId, params) {
  await knex('users').where('id', userId).update(params)
  return getUserById(userId)
}
