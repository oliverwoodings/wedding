const axios = require('axios')
const fs = require('fs-extra')
const path = require('path')
const tmp = require('tmp-promise')
const getPhotos = require('../queries/getPhotos')

const CACHE_DIR = path.resolve(__dirname, '../../../.cache')

module.exports = async function proxyImage (req, res) {
  let { type, id } = req.params
  type = type.toUpperCase()
  const photos = await getPhotos(type)
  const photo = photos.find(photo => photo.id === id)

  if (!photo) {
    return res.sendStatus(404, 'Image not found')
  }

  const cacheId = id + (req.query.download ? '-full' : '-thumb')
  await fs.mkdirp(CACHE_DIR)
  res.setHeader('etag', cacheId)
  if (await existsInCache(cacheId)) {
    if (req.headers['if-none-match'] === cacheId) {
      return res.sendStatus(304)
    }
    return streamFromCache(cacheId).pipe(res)
  }

  const url = req.query.download ? photo.downloadLink : photo.thumbnailLink
  const { data } = await axios({
    method: 'GET',
    url,
    responseType: 'stream'
  })
  await pipeToCache(data, cacheId)
  data.pipe(res)
}

function existsInCache (cacheId) {
  return fs.exists(getCachePath(cacheId))
}

function streamFromCache (cacheId) {
  return fs.createReadStream(getCachePath(cacheId))
}

async function pipeToCache (data, cacheId) {
  const { path: tmpPath } = await tmp.file()
  const writeStream = await fs.createWriteStream(tmpPath)
  writeStream.on('close', async () => {
    await fs.move(tmpPath, getCachePath(cacheId))
  })
  data.pipe(writeStream)
}

function getCachePath (cacheId) {
  return path.join(CACHE_DIR, cacheId)
}
