import React, { Component } from 'react'
import withMutation from '../../lib/withMutation'
import PageBody from '../../components/PageBody'
import Button from '../../components/Button'
import Error from './Error'
import LoginInput from './LoginInput'
import ChangePasswordMutation from './ChangePassword.graphql'

class ResetPasswordForm extends Component {
  state = {
    code: '',
    email: '',
    password: '',
    password2: ''
  }

  componentWillUpdate ({ reset, onSuccess }) {
    if (this.props.reset.isPending && !reset.isPending && !reset.hasFailed) {
      onSuccess()
    }
  }

  render () {
    const { reset } = this.props
    const { code, email, password, password2 } = this.state

    const passwordMismatch = password !== password2 && password && password2
    const invalidPassword = password && password === password2 && password.length < 8

    let error
    if (passwordMismatch) {
      error = 'Whoops! Your passwords don\'t match'
    } else if (invalidPassword) {
      error = 'Password must be at least 8 characters'
    }

    const showError = !reset.haveVariablesChanged({ code, email, password }) || error
    const disabled = anyEmpty([code, email, password, password2]) || passwordMismatch || invalidPassword

    return (
      <PageBody title='Reset your password' fill>
        <LoginInput
          placeholder='Invite code'
          value={code}
          onChange={(code) => this.setState({ code })}
          autofocus
        />
        <LoginInput
          placeholder='Email address'
          value={email}
          onChange={(email) => this.setState({ email })}
        />
        <LoginInput
          type='password'
          placeholder='Pick a new password'
          value={password}
          onChange={(password) => this.setState({ password })}
        />
        <LoginInput
          type='password'
          placeholder='...and type it again!'
          value={password2}
          onEnter={!disabled && execute}
          onChange={(password2) => this.setState({ password2 })}
        />
        <Button secondary onClick={execute} disabled={disabled}>
          Reset
        </Button>
        {showError && <Error error={reset.error}>{error}</Error>}
      </PageBody>
    )

    function execute () {
      reset.execute({ code, email, password })
    }
  }
}

export default withMutation(ChangePasswordMutation, { name: 'reset' })(ResetPasswordForm)

function anyEmpty (fields) {
  return fields.some((field) => !field || String(field).trim().length === 0)
}
