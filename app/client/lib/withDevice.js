import React from 'react'
import { ConnectAtom } from 'tiny-atom/react'

export default function withDevice () {
  return InnerComponent => {
    return function WithDevice (props, { device }) {
      return (
        <ConnectAtom
          render={({ state }) => (
            <InnerComponent {...props} device={state.device} />
          )}
        />
      )
    }
  }
}
