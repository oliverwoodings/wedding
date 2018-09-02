import React, { Component } from 'react'
import withMutation from '../../lib/withMutation'
import hello from '../../lib/hello'
import { Link } from '../../components/typography'
import PageBody from '../../components/PageBody'
import Action from './Action'
import Error from './Error'
import LoginInput from './LoginInput'
import LoginMutation from './Login.graphql'
import styles from './PasswordForm.css'

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
    const { publicUser, login, codeOrEmail, onResetPassword } = this.props
    const { password } = this.state

    const disabled = !password.trim().length

    return (
      <PageBody title={`Hello ${hello(publicUser.guests)}!`} fill>
        <Action onAction={execute} disabled={disabled}>
          <LoginInput
            type='password'
            placeholder='Enter password'
            value={password}
            onEnter={!disabled && execute}
            onChange={(password) => this.setState({ password })}
            autofocus
          />
        </Action>
        {!login.haveVariablesChanged({ password }) && <Error error={login.error} />}
        <div className={styles.forgotten}>
          Forgotten your password? Reset it <Link onClick={onResetPassword}>here</Link>
        </div>
      </PageBody>
    )

    function execute () {
      login.execute({ codeOrEmail, password })
    }
  }
}

export default withMutation(LoginMutation, { name: 'login' })(PasswordForm)
