const getUser = require('./queries/getUser')
const getUserGuests = require('./queries/getUserGuests')
const login = require('./commands/login')
const changePassword = require('./commands/changePassword')

module.exports = {
  Query: {
    publicUser (obj, args) {
      return getUser(args.codeOrEmail)
    },
    async user (obj, args, context) {
      await context.authenticate()
      return context.user
    }
  },
  Mutation: {
    async login (obj, args, context) {
      const { codeOrEmail, password } = args

      const { sessionId, user } = await login(codeOrEmail, password)

      context.res.cookie('sessionId', sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
      })

      return user
    },
    changePassword (obj, args) {
      return changePassword(args.code, args.email, args.password)
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
