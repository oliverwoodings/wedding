const ShortUniqueId = require('short-unique-id')
const knex = require('../knex')
const getUserById = require('../queries/getUserById')

const uid = new ShortUniqueId()

module.exports = async function createUser (user = {}, guests = []) {
  const userId = await knex.transaction(async (trx) => {
    const code = await generateCode(trx)
    const [userId] = await trx('users').insert({
      code,
      eveningOnly: !!user.eveningOnly
    })

    for (const guest of guests) {
      await trx('guests').insert({
        ...guest,
        userId
      })
    }

    return userId
  })

  return getUserById(userId)
}

async function generateCode (trx, attempt = 1) {
  if (attempt > 5) {
    throw new Error('Could not generate unique code after 5 attempts')
  }

  const code = uid.randomUUID(6).toUpperCase()
  const existingUser = await trx('users').where('code', code).first()
  if (existingUser) {
    return generateCode(trx, attempt + 1)
  }
  return code
}
