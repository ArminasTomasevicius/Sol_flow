import React from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import styles from './user-item.module.css'

const UserItem = ({ publicKey, profilePhoto, created }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Link href="/users/[publicKey]" as={`/users/${publicKey}`}>
          <a>
            <img src={profilePhoto} alt={publicKey} />
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <Link href="/users/[publicKey]" as={`/users/${publicKey}`}>
          <a>{publicKey}</a>
        </Link>
        <p>
          created{' '}
          {formatDistanceToNowStrict(new Date(created), {
            addSuffix: true
          })}
        </p>
      </div>
    </div>
  )
}

export default UserItem
