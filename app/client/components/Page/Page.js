import React, { Component } from 'react'
import Banner from './Banner'
import HeaderBackground from './HeaderBackground'
import Navigation from './Navigation'
import Footer from './Footer'
import styles from './Page.css'

export default class Page extends Component {
  componentWillUpdate ({ path }) {
    if (path !== this.props.path && this.node) {
      this.node.scrollTop = 0
    }
  }

  render () {
    const {
      children,
      minimalist,
      nav,
      path,
      isAdmin,
      weddingStatus
    } = this.props
    return (
      <div
        className={styles.page}
        ref={node => {
          this.node = node
        }}
      >
        <div className={styles.header}>
          <HeaderBackground image='church' />
          <Banner minimalist={minimalist} weddingStatus={weddingStatus} />
          {nav && (
            <Navigation
              path={path}
              isAdmin={isAdmin}
              weddingStatus={weddingStatus}
            />
          )}
        </div>
        {children}
        <Footer />
      </div>
    )
  }
}
