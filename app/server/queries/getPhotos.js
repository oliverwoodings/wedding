const config = require('config')
const { getClient } = require('../lib/gdrive')

const FILE_FIELDS = [
  'id',
  'name',
  'webContentLink',
  'imageMediaMetadata',
  'thumbnailLink',
  'description'
]

module.exports = async function getPhotos (type = 'OFFICIAL') {
  const drive = await getClient()

  const photos = []
  await fetchPage()

  return photos.map(toPhotoResource)

  async function fetchPage (nextPageToken) {
    const { data } = await drive.files.list({
      pageSize: 100,
      pageToken: nextPageToken,
      fields: `nextPageToken, files(${FILE_FIELDS.join(', ')})`,
      q: `'${config.photos.folders[type]}' in parents`
    })
    photos.push(...data.files)
    if (data.nextPageToken) {
      await fetchPage(data.nextPageToken)
    }
  }
}

function toPhotoResource (file) {
  let {
    id,
    name,
    webContentLink,
    imageMediaMetadata,
    thumbnailLink,
    description
  } = file

  const { width, height } = imageMediaMetadata
  try {
    description = JSON.parse(description)
  } catch (e) {
    description = {}
  }

  return {
    id,
    name,
    thumbnailLink: thumbnailLink.replace(/(=s\d+)$/, '=s1000'),
    width,
    height,
    downloadLink: webContentLink,
    uploader: description.uploader,
    tags: description.tags || []
  }
}
