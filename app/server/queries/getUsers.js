const knex = require('../knex')

module.exports = async function getUser (codeOrEmail) {
  const users = await knex('users').where('deleted', false)
  return users.map(user => ({
    ...user,
    new: !user.email
  }))
}
