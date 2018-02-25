const knex = require('../knex')
const getUser = require('../queries/getUser')
const { hash, generateSalt } = require('../lib/auth')
const AuthenticationError = require('../errors/AuthenticationError')

module.exports = async function login (codeOrEmail, password) {
  const user = await getUser(codeOrEmail)
  if (!user) {
    throw new AuthenticationError('INVALID_USER_ID')
  }

  if (hash(password, user.salt) === user.password) {
    const sessionId = generateSalt()
    await knex('sessions').insert({
      key: sessionId,
      userId: user.id
    })

    return {
      user,
      sessionId
    }
  }

  throw new AuthenticationError('INVALID_PASSWORD')
}
