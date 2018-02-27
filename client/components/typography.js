import React from 'react'
import classnames from 'classnames'
import styles from './typography.css'

export const Title = createTypographyComponent('h1', styles.title)
export const SubTitle = createTypographyComponent('h2', styles.subTitle)
export const Paragraph = createTypographyComponent('p', styles.paragraph)
export const Strong = createTypographyComponent('span', styles.strong)
export const Link = createTypographyComponent('a', styles.link)
export const Body = createTypographyComponent('div', styles.body)

function createTypographyComponent (defaultElement, typeClassName) {
  return ({ className, children, element, ...props }) => React.createElement(element || defaultElement, {
    ...props,
    className: classnames(typeClassName, className)
  }, children)
}
