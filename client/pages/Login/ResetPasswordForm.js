import React, { Component } from 'react'
import { SubTitle } from '../../components/typography'
import withMutation from '../../lib/withMutation'
import Box from './Box'
import Action from './Action'
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
      <Box title='Reset your password'>
        <LoginInput
          placeholder='Invite code'
          value={code}
          onChange={(code) => this.setState({ code })}
        />
        <LoginInput
          placeholder='Email address'
          value={email}
          onChange={(email) => this.setState({ email })}
        />
        <LoginInput
          type='password'
          placeholder='New password'
          value={password}
          onChange={(password) => this.setState({ password })}
        />
        <Action onAction={execute} disabled={disabled}>
          <LoginInput
            type='password'
            placeholder='...and again!'
            value={password2}
            onEnter={!disabled && execute}
            onChange={(password2) => this.setState({ password2 })}
          />
        </Action>
        {showError && <Error error={reset.error}>{error}</Error>}
      </Box>
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
