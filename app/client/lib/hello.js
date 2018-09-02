export default function hello (guests) {
  return guests.reduce((memo, { firstName }, i) => {
    if (!memo) {
      return firstName
    }
    if (i === guests.length - 1) {
      return `${memo} & ${firstName}`
    }
    return `${memo}, ${firstName}`
  }, '')
}
