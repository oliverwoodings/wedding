import React, { Fragment } from 'react'
import { get } from 'lodash-es'
import compose from 'compose-function'
import PageBody from '../../components/PageBody'
import withQuery from '../../lib/withQuery'
import withMutation from '../../lib/withMutation'
import ModalLauncher from '../../components/ModalLauncher'
import Button from '../../components/Button'
import EditUserModal from './EditUserModal'
import UsersTable from './UsersTable'
import UsersQuery from './Users.graphql'
import CreateUserMutation from './CreateUser.graphql'
import styles from './Admin.css'

function Admin ({ query, createUser }) {
  const users = get(query, 'data.users')
  if (!users) {
    return null
  }

  return (
    <PageBody
      title='Admin'
      className={styles.root}
    >
      <ModalLauncher renderModal={({ closeModal, userId }) => (
        <EditUserModal
          user={users.find(({ id }) => id === userId)}
          onClose={closeModal}
          refetchUser={query.execute}
        />
      )}>
        {({ openModal }) => (
          <Fragment>
            <UsersTable
              users={users}
              onClickRow={(user) => openModal({ userId: user.id })}
            />
            <Button className={styles.new} onClick={() => createNewUser(openModal)}>
              New invite
            </Button>
          </Fragment>
        )}
      </ModalLauncher>
    </PageBody>
  )

  async function createNewUser (openModal) {
    const result = await createUser.execute()
    await query.execute()
    openModal({ userId: result.createUser.id })
  }
}

export default compose(
  withQuery(UsersQuery),
  withMutation(CreateUserMutation, { name: 'createUser' })
)(Admin)
