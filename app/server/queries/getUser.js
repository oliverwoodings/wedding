const knex = require('../knex')

module.exports = async function getUser (codeOrEmail) {
  const user = await knex('users')
    .where('code', codeOrEmail)
    .orWhere('email', codeOrEmail)
    .first()

  if (user) {
    user.new = !user.email
    return user
  }

  return null
}
