const config = require('config')
const _ = require('lodash')
const { getClient } = require('../lib/gdrive')

const FILE_FIELDS = [
  'id',
  'name',
  'webContentLink',
  'imageMediaMetadata',
  'thumbnailLink',
  'description',
  'parents'
]

const CACHE_FOR = 1000 * 60 * 15
let photos = {
  OFFICIAL: null,
  GUEST: null
}

module.exports = async function getPhotos (type = 'OFFICIAL') {
  if (!photos[type]) {
    photos[type] = await getPhotosOfType(type)
    setTimeout(() => module.exports.clearCache(type), CACHE_FOR)
  }
  return photos[type]
}

module.exports.clearCache = function clearCache (type) {
  photos[type] = null
}

async function getPhotosOfType (type) {
  const drive = await getClient()
  const q = config.photos.folders[type]
    .map(id => `'${id}' in parents`)
    .join(' or ')

  const photos = []
  await fetchPage()

  return _(photos)
    .map(photo => toPhotoResource(photo, type))
    .filter(Boolean)
    .sortBy(photo => `${photo.parentIndex}_${photo.name}`)

  async function fetchPage (nextPageToken) {
    const { data } = await drive.files.list({
      pageSize: 100,
      pageToken: nextPageToken,
      fields: `nextPageToken, files(${FILE_FIELDS.join(', ')})`,
      q
    })
    photos.push(...data.files)
    if (data.nextPageToken) {
      await fetchPage(data.nextPageToken)
    }
  }
}

function toPhotoResource (file, type) {
  let {
    id,
    name,
    webContentLink,
    imageMediaMetadata,
    thumbnailLink,
    description,
    parents
  } = file

  if (!imageMediaMetadata) return

  const { width, height } = imageMediaMetadata
  try {
    description = JSON.parse(description)
  } catch (e) {
    description = {}
  }

  return {
    id,
    name,
    parentIndex: config.photos.folders[type].indexOf(parents[0]) || 0,
    thumbnailLink: thumbnailLink.replace(/(=s\d+)$/, '=s1000'),
    width,
    height,
    downloadLink: webContentLink,
    uploader: description.uploader,
    tags: description.tags || []
  }
}
