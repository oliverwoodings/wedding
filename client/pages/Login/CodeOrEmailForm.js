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

  const disabled = !codeOrEmail.trim().length

  return (
    <Box>
      <Action onAction={onSubmit} disabled={disabled}>
        <LoginInput
          placeholder='Invite code or email address'
          value={codeOrEmail}
          onChange={onChange}
          onEnter={!disabled && onSubmit}
        />
      </Action>
      <Error error={error}>{userNotFound && 'Sorry, that code or email doesn\'t exist!'}</Error>
    </Box>
  )
}

