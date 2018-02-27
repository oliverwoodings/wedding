import React, { Component } from 'react'
import withMutation from '../../lib/withMutation'
import Hello from '../../components/Hello'
import Box from './Box'
import Action from './Action'
import Error from './Error'
import LoginInput from './LoginInput'
import LoginMutation from './Login.graphql'

class PasswordForm extends Component {
  state = {
    password: ''
  }

  componentWillUpdate ({ login, onSuccess }) {
    if (this.props.login.isPending && !login.isPending && !login.hasFailed) {
      onSuccess()
    }
  }

  render () {
    const { publicUser, login, codeOrEmail } = this.props
    const { password } = this.state

    return (
      <Box>
        <Hello guests={publicUser.guests} />
        <Action onAction={execute}>
          <LoginInput
            type='password'
            placeholder='Enter your password'
            value={password}
            onEnter={execute}
            onChange={(password) => this.setState({ password })}
          />
        </Action>
        <Error error={login.error} />
      </Box>
    )

    function execute () {
      login.execute({ codeOrEmail, password })
    }
  }
}

export default withMutation(LoginMutation, { name: 'login' })(PasswordForm)
