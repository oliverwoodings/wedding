export const initialState = {
  device: null
}

const actions = {
  changeDevice (get, split, payload) {
    split({ device: payload })
  }
}

export function evolve (router) {
  return (get, split, { type, payload }) => {
    if (type === 'navigate') {
      router.push(payload.path, payload)
    } else {
      actions[type](get, split, payload)
    }
  }
}
