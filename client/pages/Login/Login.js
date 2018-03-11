import React, { Component } from 'react'
import classnames from 'classnames'
import withQuery from '../../lib/withQuery'
import CodeOrEmailForm from './CodeOrEmailForm'
import PasswordForm from './PasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import NewUserForm from './NewUserForm'
import LookupQuery from './LookupCodeOrEmail.graphql'
import styles from './Login.css'

const STAGES = {
  CODE_OR_EMAIL: 0,
  PASSWORD: 1,
  RESET_PASSWORD: 2,
  NEW_USER: 3
}

class Login extends Component {
  state = {
    stage: STAGES.CODE_OR_EMAIL,
    codeOrEmail: ''
  }

  componentWillMount () {
    const { user, goToHome } = this.props
    if (user) {
      goToHome()
    }
  }

  componentWillUpdate ({ lookupQuery, user, goToHome }) {
    const hasLookupFinished = !lookupQuery.isPending && this.props.lookupQuery.isPending
    const hasLookupFailed = lookupQuery.hasFailed

    if (user && !this.props.user) {
      goToHome()
    } else if (hasLookupFinished && !hasLookupFailed && lookupQuery.data.publicUser) {
      const { publicUser } = lookupQuery.data
      this.setState({
        stage: publicUser.new ? STAGES.NEW_USER : STAGES.PASSWORD
      })
    }
  }

  render () {
    const { lookupQuery, refetchUser } = this.props
    const { stage, codeOrEmail } = this.state

    return (
      <div className={styles.login}>
        {stage === STAGES.CODE_OR_EMAIL && (
          <CodeOrEmailForm
            isPending={lookupQuery.isPending}
            userNotFound={userNotFound(lookupQuery, codeOrEmail)}
            error={lookupQuery.error}
            codeOrEmail={codeOrEmail}
            onChange={(codeOrEmail) => this.setState({ codeOrEmail })}
            onSubmit={() => lookupQuery.execute({ codeOrEmail })}
          />
        )}
        {stage === STAGES.PASSWORD && (
          <PasswordForm
            publicUser={lookupQuery.data.publicUser}
            codeOrEmail={codeOrEmail}
            onSuccess={refetchUser}
            onResetPassword={() => this.setState({ stage: STAGES.RESET_PASSWORD })}
          />
        )}
        {stage === STAGES.RESET_PASSWORD && (
          <ResetPasswordForm
            onSuccess={refetchUser}
          />
        )}
        {stage === STAGES.NEW_USER && (
          <NewUserForm
            onSuccess={refetchUser}
            code={codeOrEmail}
            publicUser={lookupQuery.data.publicUser}
          />
        )}
      </div>
    )
  }
}

export default withQuery(LookupQuery, { lazy: true, name: 'lookupQuery' })(Login)

function userNotFound ({ hasExecuted, isPending, hasFailed, data, haveVariablesChanged }, codeOrEmail) {
  return hasExecuted && !isPending && !hasFailed && !data.publicUser && !haveVariablesChanged({ codeOrEmail })
}
