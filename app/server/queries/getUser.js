const knex = require('../knex')

module.exports = async function getUser (codeOrEmail) {
  const user = await knex('users')
    .where('code', codeOrEmail.toUpperCase())
    .orWhere('email', codeOrEmail.toLowerCase())
    .first()

  if (user) {
    user.new = !user.email
    return user
  }

  return null
}
