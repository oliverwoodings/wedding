export default function IfStatus ({ status, pre, today, post, children }) {
  if (
    (status === 'PRE' && pre) ||
    (status === 'TODAY' && today) ||
    (status === 'POST' && post)
  ) {
    return children
  }
  return null
}
