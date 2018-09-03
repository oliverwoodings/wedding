const knex = require('../knex')

module.exports = function getUserGuests (userId) {
  return knex('guests')
    .where('userId', userId)
    .where('deleted', false)
}
