import React, { Component } from 'react'
import withMutation from '../../lib/withMutation'
import hello from '../../lib/hello'
import PageBody from '../../components/PageBody'
import Button from '../../components/Button'
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
      <PageBody title={`Hello ${hello(publicUser.guests)}!`} fill>
        <LoginInput
          placeholder='Enter your email address'
          value={email}
          onChange={(email) => this.setState({ email })}
          autofocus
        />
        <LoginInput
          type='password'
          placeholder='Pick a password'
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
          Create account
        </Button>
        {showError && <Error error={signup.error}>{error}</Error>}
      </PageBody>
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
