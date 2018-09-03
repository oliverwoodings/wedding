const knex = require('../knex')

module.exports = async function getUserById (id) {
  const user = await knex('users')
    .where('id', id)
    .andWhere('deleted', false)
    .first()

  if (user) {
    user.new = !user.email
    return user
  }

  return null
}
