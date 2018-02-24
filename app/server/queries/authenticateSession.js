const knex = require('../knex')

module.exports = async function authenticateUser (sessionId) {
  const session = await knex('sessions').where('key', sessionId).first()
  return !!session
}
