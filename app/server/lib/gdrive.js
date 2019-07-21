const path = require('path')
const { google } = require('googleapis')

const KEYFILE = path.resolve(__dirname, '../../../config/keyfile.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']

let clientPromise = null

module.exports = { getClient }

function getClient () {
  if (!clientPromise) {
    clientPromise = google.auth
      .getClient({
        scopes: SCOPES,
        keyFile: KEYFILE
      })
      .then(auth => {
        const drive = google.drive({ version: 'v3', auth })
        return drive
      })
      .catch(e => {
        clientPromise = null
        throw e
      })
  }
  return clientPromise
}
