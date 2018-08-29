const knex = require('../knex')
const getUserGuests = require('../queries/getUserGuests')
const UnauthorisedError = require('../errors/UnauthorisedError')

module.exports = async function updateGuest (userId, guestId, params) {
  const userGuests = await getUserGuests(userId)
  const belongsToUser = userGuests.some((guest) => guest.id === guestId)

  if (!belongsToUser) {
    throw new UnauthorisedError()
  }

  await knex('guests').where({
    userId,
    id: guestId
  }).update(params)

  return knex('guests').where('id', guestId).first()
}
