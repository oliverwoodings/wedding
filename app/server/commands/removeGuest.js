const knex = require('../knex')
const getUserById = require('../queries/getUserById')

module.exports = async function removeGuest (guestId) {
  const guest = await knex('guests').where('id', guestId).first()
  await knex('guests').where('id', guestId).update({
    deleted: true
  })
  return getUserById(guest.userId)
}
