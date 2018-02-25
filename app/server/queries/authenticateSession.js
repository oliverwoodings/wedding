const knex = require('../knex')

module.exports = async function authenticateUser (sessionId) {
  if (sessionId) {
    const session = await knex('sessions').where('key', sessionId).first()
    if (session) {
      return session.userId
    }
  }
}
