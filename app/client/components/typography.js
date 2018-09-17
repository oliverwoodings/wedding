import React from 'react'
import classnames from 'classnames'
import styles from './typography.css'

export const Title = createTypographyComponent('h1', styles.title)
export const SubTitle = createTypographyComponent('h2', styles.subTitle)
export const Header = createTypographyComponent('h3', styles.header)
export const Paragraph = createTypographyComponent('p', styles.paragraph)
export const Strong = createTypographyComponent('span', styles.strong)
export const Link = createTypographyComponent('a', styles.link)

function createTypographyComponent (defaultElement, typeClassName) {
  return ({ className, children, element, ...props }) => React.createElement(element || defaultElement, {
    target: isExternalLink(props.href) ? '_blank' : undefined,
    ...props,
    className: classnames(typeClassName, className)
  }, children)
}

function isExternalLink (href) {
  return /^https?:\/\//.test(href)
}
