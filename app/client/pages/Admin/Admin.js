import React, { Fragment } from 'react'
import { get } from 'lodash-es'
import compose from 'compose-function'
import { Header } from '../../components/typography'
import PageBody from '../../components/PageBody'
import withQuery from '../../lib/withQuery'
import withMutation from '../../lib/withMutation'
import ModalLauncher from '../../components/ModalLauncher'
import Button from '../../components/Button'
import EditUserModal from './EditUserModal'
import UsersTable from './UsersTable'
import UsersSummary from './UsersSummary'
import GuestExplorer from './GuestExplorer'
import UsersQuery from './Users.graphql'
import CreateUserMutation from './CreateUser.graphql'
import styles from './Admin.css'

function Admin ({ query, createUser }) {
  const users = get(query, 'data.users')
  if (!users) {
    return <PageBody title='Admin' className={styles.root} />
  }

  return (
    <PageBody title='Admin' className={styles.root}>
      <ModalLauncher
        renderModal={({ closeModal, userId }) => (
          <EditUserModal
            user={users.find(({ id }) => id === userId)}
            onClose={closeModal}
            refetchUser={query.execute}
          />
        )}
      >
        {({ openModal }) => (
          <Fragment>
            <H>Invites</H>
            <UsersTable
              users={users}
              onClickRow={userId => openModal({ userId })}
            />
            <Button
              className={styles.new}
              onClick={() => createNewUser(openModal)}
              secondary
            >
              New invite
            </Button>
            <H>Summary</H>
            <UsersSummary users={users} />
            <H>Guest list</H>
            <GuestExplorer
              users={users}
              onClickRow={userId => openModal({ userId })}
            />
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

function H ({ children }) {
  return <Header className={styles.header}>{children}</Header>
}
