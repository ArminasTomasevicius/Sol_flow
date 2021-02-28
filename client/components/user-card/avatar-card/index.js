import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import { publicFetch } from '../../../util/fetcher'

import { Spinner } from '../../icons'

import styles from './avatar-card.module.css'

const UserAvatar = ({ publicKey }) => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await publicFetch.get(`/user/${publicKey}`)
      setUserInfo(data)
    }

    fetchUser()
  }, [publicKey])

  return (
    <div>
      <div className={styles.avatarCard}>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.avatar}>
            <Link href="/users/[publicKey]" as={`/users/${publicKey}`}>
              <a>
                <img
                  src={`https://secure.gravatar.com/avatar/${userInfo.id}?s=164&d=identicon`}
                  alt={publicKey}
                />
              </a>
            </Link>
          </div>
        )}
        <h2 className={styles.publicKey}>{publicKey}</h2>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.created}>
            <p>
              Created:{' '}
              <span>
                {formatDistanceToNowStrict(new Date(userInfo.created), {
                  addSuffix: true
                })}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAvatar
