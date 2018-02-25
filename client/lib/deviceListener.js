export default function createListener (devices = {}, onDeviceChange) {
  Object.keys(devices).forEach(deviceName => {
    const deviceQuery = convertQuery(devices[deviceName])
    const mql = window.matchMedia(deviceQuery)

    if (mql.matches) onDeviceChange(deviceName)
    mql.addListener(e => {
      if (e.matches) {
        onDeviceChange(deviceName)
      }
    })
  })
}

function convertQuery (query) {
  return Object.keys(query)
    .map(key => `(${hyphenateStyle(key)}: ${query[key]}px)`)
    .join(' and ')
}

function hyphenateStyle (styleName) {
  return styleName
    .replace(/[A-Z]/g, '-$&')
    .toLowerCase()
}
