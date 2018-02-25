import React from 'react'
import PropTypes from 'prop-types'

export default function withDevice () {
  return (InnerComponent) => {
    function WithDevice (props, { device }) {
      return <InnerComponent {...props} device={device} />
    }

    WithDevice.contextTypes = {
      device: PropTypes.string
    }

    return WithDevice
  }
}
