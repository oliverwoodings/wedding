const knex = require('../knex')
const getUserGuests = require('../queries/getUserGuests')
const getUserById = require('../queries/getUserById')

module.exports = async function removeGuest (guestId) {
  const guest = await knex('guests').where('id', guestId).first()
  const userGuests = await getUserGuests(guest.userId)

  await knex.transaction(async (trx) => {
    await trx('guests').where('id', guestId).del()

    if (userGuests.length === 1) {
      await trx('users').where('id', guest.userId).del()
    }
  })

  return getUserById(guest.userId)
}
