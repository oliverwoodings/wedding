import React from 'react'
import PageBody from '../../components/PageBody'
import Button from '../../components/Button'
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
      <LoginInput
        placeholder='Enter your invite code or email'
        value={codeOrEmail}
        onChange={onChange}
        onEnter={!disabled && onSubmit}
        autofocus
      />
      <Button secondary onClick={onSubmit} disabled={disabled}>
        Next
      </Button>
      <Error error={error}>{userNotFound && 'Sorry, that code or email doesn\'t exist!'}</Error>
    </PageBody>
  )
}

