import React from 'react'
import { get } from 'lodash-es'
import PageBody from '../../components/PageBody'
import withQuery from '../../lib/withQuery'
import ModalLauncher from '../../components/ModalLauncher'
import EditUserModal from './EditUserModal'
import UsersTable from './UsersTable'
import UsersQuery from './Users.graphql'
import styles from './Admin.css'

function Admin ({ query }) {
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
          <UsersTable
            users={users}
            onClickRow={(user) => openModal({ userId: user.id })}
          />
        )}
      </ModalLauncher>
    </PageBody>
  )
}

export default withQuery(UsersQuery)(Admin)
