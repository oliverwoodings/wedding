const { pick } = require('lodash')
const knex = require('../knex')
const getUserGuests = require('../queries/getUserGuests')
const getUserById = require('../queries/getUserById')
const UnauthorisedError = require('../errors/UnauthorisedError')

const NON_ADMIN_WHITELIST = [
  'isAttending',
  'hasDietaryRequirements',
  'dietaryRequirements'
]

module.exports = async function updateGuest (userId, guestId, params) {
  const user = await getUserById(userId)
  const userGuests = await getUserGuests(userId)
  const belongsToUser = userGuests.some((guest) => guest.id === guestId)

  if (!belongsToUser && !user.isAdmin) {
    throw new UnauthorisedError()
  }

  if (!user.isAdmin) {
    params = pick(params, NON_ADMIN_WHITELIST)
  }

  await knex('guests').where({
    userId,
    id: guestId
  }).update(params)

  return knex('guests').where('id', guestId).first()
}
