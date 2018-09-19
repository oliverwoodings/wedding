const knex = require('../knex')

module.exports = async function removeUser (userId) {
  await knex.transaction(async trx => {
    await trx('guests')
      .where('userId', userId)
      .update({
        deleted: true
      })
    await trx('users')
      .where('id', userId)
      .update({
        deleted: true
      })
  })
}
