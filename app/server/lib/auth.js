const crypto = require('crypto')

module.exports = { generateSalt, hash }

function generateSalt () {
  return crypto.randomBytes(64).toString('hex')
}

function hash (password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  return hash.digest('hex')
}
