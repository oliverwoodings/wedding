import React from 'react'
import Box from './Box'
import Action from './Action'
import LoginInput from './LoginInput'
import Error from './Error'

export default function CodeOrEmailForm (props) {
  const {
    query,
    codeOrEmail,
    onChange,
    onSubmit,
    isPending,
    error,
    userNotFound
  } = props

  return (
    <Box>
      <Action onAction={onSubmit}>
        <LoginInput
          placeholder='Invite code or email address'
          value={codeOrEmail}
          onChange={onChange}
          onEnter={onSubmit}
        />
      </Action>
      {error && <Error error={error} />}
      {userNotFound && <Error>Sorry, that code or email doesn't exist!</Error>}
    </Box>
  )
}

