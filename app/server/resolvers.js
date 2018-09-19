const { pick } = require('lodash')
const getUser = require('./queries/getUser')
const getUsers = require('./queries/getUsers')
const getUserGuests = require('./queries/getUserGuests')
const searchSpotify = require('./queries/searchSpotify')
const login = require('./commands/login')
const changePassword = require('./commands/changePassword')
const updateGuest = require('./commands/updateGuest')
const createUser = require('./commands/createUser')
const updateUser = require('./commands/updateUser')
const addGuest = require('./commands/addGuest')
const removeGuest = require('./commands/removeGuest')
const removeUser = require('./commands/removeUser')
const addTrackToPlaylist = require('./commands/addTrackToPlaylist')
const auditAction = require('./commands/auditAction')

const NON_ADMIN_GUEST_WHITELIST = [
  'isAttending',
  'hasDietaryRequirements',
  'dietaryRequirements'
]

module.exports = {
  Query: {
    publicUser (obj, args) {
      return getUser(args.codeOrEmail)
    },
    async user (obj, args, context) {
      await context.authenticate()
      return context.user
    },
    async tracks (obj, args, context) {
      await context.authenticate()
      const { query } = args
      await context.audit('SEARCH_SPOTIFY', { query })
      return searchSpotify(query)
    },
    async users (obj, args, context) {
      await context.requireAdmin()
      return getUsers()
    }
  },
  Mutation: {
    async login (obj, args, context) {
      const { codeOrEmail, password } = args

      const { sessionId, user } = await login(codeOrEmail, password)
      context.setSessionId(sessionId)
      context.user = user
      await context.audit('LOGIN')

      return user
    },
    async changePassword (obj, args, context) {
      const { code, email, password } = args
      await changePassword(code, email, password)
      
      const { sessionId, user } = await login(email, password)
      context.setSessionId(sessionId)
      context.user = user
      await context.audit('CHANGE_PASSWORD')

      return user
    },
    async updateGuest (obj, args, context) {
      await context.authenticate()
      let userId = context.user.id
      let { guest, guestId } = args

      if (context.user.isAdmin && args.userId) {
        userId = args.userId
      } else if (!context.user.isAdmin) {
        guest = pick(guest, NON_ADMIN_GUEST_WHITELIST)
      }
      await context.audit('UPDATE_GUEST', { guestId, guest })

      return updateGuest(userId, guestId, guest)
    },
    async createUser (obj, args, context) {
      await context.requireAdmin()
      const { user, guests } = args
      await context.audit('CREATE_USER', { user, guests })
      return createUser(user, guests)
    },
    async updateUser (obj, args, context) {
      await context.requireAdmin()
      const { userId, user } = args
      await context.audit('UPDATE_USER', { userId, user })
      return updateUser(userId, user)
    },
    async addGuest (obj, args, context) {
      await context.requireAdmin()
      const { userId, guest } = args
      await context.audit('ADD_GUEST', { userId, guest })
      return addGuest(userId, guest)
    },
    async removeGuest (obj, args, context) {
      await context.requireAdmin()
      const { guestId } = args
      await context.audit('REMOVE_GUEST', { guestId })
      return removeGuest(guestId)
    },
    async removeUser (obj, args, context) {
      await context.requireAdmin()
      const { userId } = args
      await context.audit('REMOVE_USER', { userId })
      return removeUser(userId)
    },
    async addTrackToPlaylist (obj, args, context) {
      await context.authenticate()
      const { trackId } = args
      await context.audit('ADD_TO_PLAYLIST', { trackId })
      return addTrackToPlaylist(trackId)
    }
  },
  PublicUser: {
    guests (obj) {
      return getUserGuests(obj.id)
    }
  },
  User: {
    guests (obj) {
      return getUserGuests(obj.id)
    }
  }
}
