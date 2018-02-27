import React, { Component } from 'react'
import withMutation from '../../lib/withMutation'
import hello from '../../lib/hello'
import Box from './Box'
import Action from './Action'
import Error from './Error'
import LoginInput from './LoginInput'
import ChangePasswordMutation from './ChangePassword.graphql'

class NewUserForm extends Component {
  state = {
    email: '',
    password: '',
    password2: ''
  }

  componentWillUpdate ({ signup, onSuccess }) {
    if (this.props.signup.isPending && !signup.isPending && !signup.hasFailed) {
      onSuccess()
    }
  }

  render () {
    const { signup, code, publicUser } = this.props
    const { email, password, password2 } = this.state

    const passwordMismatch = password !== password2 && password && password2
    const invalidPassword = password && password === password2 && password.length < 8

    let error
    if (passwordMismatch) {
      error = 'Whoops! Your passwords don\'t match'
    } else if (invalidPassword) {
      error = 'Password must be at least 8 characters'
    }

    const showError = !signup.haveVariablesChanged({ code, email, password }) || error
    const disabled = anyEmpty([email, password, password2]) || passwordMismatch || invalidPassword

    return (
      <Box title={hello(publicUser.guests)}>
        <LoginInput
          placeholder='Enter your email address'
          value={email}
          onChange={(email) => this.setState({ email })}
        />
        <LoginInput
          type='password'
          placeholder='Pick a password'
          value={password}
          onChange={(password) => this.setState({ password })}
        />
        <Action onAction={execute} disabled={disabled}>
          <LoginInput
            type='password'
            placeholder='...and type it again!'
            value={password2}
            onEnter={!disabled && execute}
            onChange={(password2) => this.setState({ password2 })}
          />
        </Action>
        {showError && <Error error={signup.error}>{error}</Error>}
      </Box>
    )

    function execute () {
      signup.execute({ code, email, password })
    }
  }
}

export default withMutation(ChangePasswordMutation, { name: 'signup' })(NewUserForm)

function anyEmpty (fields) {
  return fields.some((field) => !field || String(field).trim().length === 0)
}
