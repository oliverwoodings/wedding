import React from 'react'
import PageBody from '../../components/PageBody'
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
    <PageBody title='Welcome to our wedding!' fill>
      <Action onAction={onSubmit} disabled={disabled}>
        <LoginInput
          placeholder='Enter your invite code or email'
          value={codeOrEmail}
          onChange={onChange}
          onEnter={!disabled && onSubmit}
          autofocus
        />
      </Action>
      <Error error={error}>{userNotFound && 'Sorry, that code or email doesn\'t exist!'}</Error>
    </PageBody>
  )
}

