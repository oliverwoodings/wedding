const getUser = require('./queries/getUser')
const getUserGuests = require('./queries/getUserGuests')
const searchSpotify = require('./queries/searchSpotify')
const login = require('./commands/login')
const changePassword = require('./commands/changePassword')
const updateGuest = require('./commands/updateGuest')

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
      const guest = await updateGuest(context.user.id, args.guestId, args.guest)
      return guest
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
