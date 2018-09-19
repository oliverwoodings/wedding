const knex = require('../knex')

module.exports = async function addGuest (userId, params) {
  const [guestId] = await knex('guests').insert({
    ...params,
    userId
  })
  return knex('guests')
    .where('id', guestId)
    .first()
}
