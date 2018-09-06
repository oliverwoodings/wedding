const knex = require('../knex')

const ALLOWED_ACTIONS = [
  'LOGIN',
  'CHANGE_PASSWORD',
  'UPDATE_GUEST',
  'CREATE_USER',
  'UPDATE_USER',
  'ADD_GUEST',
  'REMOVE_GUEST',
  'REMOVE_USER',
  'ADD_TO_PLAYLIST',
  'SEARCH_SPOTIFY'
]

module.exports = async function auditAction (userId, action, meta = {}) {
  if (!ALLOWED_ACTIONS.includes(action)) {
    throw new Error(`Action '${action}' is not auditable`)
  }

  await knex('audit').insert({
    createdAt: new Date(),
    userId,
    action,
    meta: JSON.stringify(meta)
  })
}
