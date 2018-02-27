import React from 'react'
import { ConnectAtom } from 'tiny-atom/react'

export default function withAtom (mapAtom) {
  return (InnerComponent) => {
    return function WithAtom (props) {
      return (
        <ConnectAtom
          map={mapAtom}
          render={(mapped) => (
            <InnerComponent {...props} {...mapped} />
          )}
        />
      )
    }
  }
}
