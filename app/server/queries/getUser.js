const knex = require('../knex')

module.exports = async function getUser (codeOrEmail) {
  const user = await knex('users')
    .where(builder =>
      builder
        .where('code', codeOrEmail.toUpperCase())
        .orWhere('email', codeOrEmail.toLowerCase())
    )
    .andWhere('deleted', false)
    .first()

  if (user) {
    user.new = !user.email
    return user
  }

  return null
}
