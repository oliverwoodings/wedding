const knex = require('../knex')

module.exports = async function findUser (codeOrEmail) {
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
