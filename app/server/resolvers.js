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
      return searchSpotify(args.query)
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

      return user
    },
    async changePassword (obj, args, context) {
      const { code, email, password } = args
      await changePassword(code, email, password)
      
      const { sessionId, user } = await login(email, password)
      context.setSessionId(sessionId)

      return user
    },
    async updateGuest (obj, args, context) {
      await context.authenticate()
      let userId = context.user.id
      if (context.user.isAdmin && args.userId) {
        userId = args.userId
      }
      return updateGuest(userId, args.guestId, args.guest)
    },
    async createUser (obj, args, context) {
      await context.requireAdmin()
      return createUser(args.user, args.guests)
    },
    async updateUser (obj, args, context) {
      await context.requireAdmin()
      return updateUser(args.userId, args.user)
    },
    async addGuest (obj, args, context) {
      await context.requireAdmin()
      return addGuest(args.userId, args.guest)
    },
    async removeGuest (obj, args, context) {
      await context.requireAdmin()
      return removeGuest(args.guestId)
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
