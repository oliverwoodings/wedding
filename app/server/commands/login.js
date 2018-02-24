const getUser = require('../queries/getUser')
const { hash, generateSalt } = require('../lib/auth')

module.exports = async function login (codeOrEmail, password) {
  const user = await getUser(codeOrEmail)
  if (!user) {
    return { status: 'INVALID_USER_ID' }
  }

  if (hash(password, user.salt) === user.password) {
    const sessionId = generateSalt()
    await knex('sessions').insert({
      key: sessionId,
      userId: user.id
    })
    
    return {
      status: 'AUTHENTICATED',
      user,
      sessionId
    }
  }

  return {
    status: 'INVALID_PASSWORD'
  }
}
