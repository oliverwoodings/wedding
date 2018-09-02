import React, { Component, Fragment } from 'react'

export default class ModalLauncher extends Component {
  state = {
    modalOpen: false,
    modalProps: null
  }

  render () {
    const { modalOpen, modalProps } = this.state
    const { children: renderChildren, renderModal } = this.props

    return (
      <Fragment>
        {renderChildren({
          openModal: (props) => this.setState({
            modalOpen: true,
            modalProps: props
          })
        })}
        {modalOpen && renderModal({
          ...modalProps,
          closeModal: () => this.setState({
            modalOpen: false,
            modalProps: null
          })
        })}
      </Fragment>
    )
  }
}
