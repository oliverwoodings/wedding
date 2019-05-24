import React from 'react'
import classnames from 'classnames'
import { SubTitle } from './typography'
import Button from './Button'
import styles from './PageBody.css'

export default function PageBody ({
  title,
  children,
  fill,
  className,
  bodyClassName,
  next,
  prev
}) {
  return (
    <div
      className={classnames(styles.body, bodyClassName, {
        [styles.fill]: fill
      })}
    >
      {title && <SubTitle className={styles.title}>{title}</SubTitle>}
      <div className={classnames(styles.children, className)}>{children}</div>
      <PrevNext prev={prev} next={next} />
    </div>
  )
}

function PrevNext ({ prev, next }) {
  if (!prev && !next) {
    return null
  }

  return (
    <div className={styles.prevnext}>
      {prev && <Button href={prev}>← Prev</Button>}
      {next && <Button href={next}>Next →</Button>}
    </div>
  )
}
