const config = require('config')
const { Duplex } = require('stream')
const { getClient } = require('../lib/gdrive')
const auditAction = require('../commands/auditAction')
const { clearCache } = require('../queries/getPhotos')

module.exports = async function uploadImage (req, res) {
  const drive = await getClient()

  const { name: filename, mimetype, data } = req.files.file

  if (!mimetype.startsWith('image/')) {
    return res.status(400).send('Invalid mimetype')
  }

  const stream = new Duplex()
  stream.push(data)
  stream.push(null)

  // TODO: size limit
  await drive.files.create({
    requestBody: {
      name: filename,
      parents: [config.photos.folders.GUEST],
      description: JSON.stringify({
        uploader: req.user.id,
        tags: []
      })
    },
    media: {
      mimeType: mimetype,
      body: stream
    }
  })

  await auditAction(req.user.id, 'UPLOAD_IMAGE', {
    filename
  })

  clearCache('GUEST')

  res.sendStatus(201)
}
