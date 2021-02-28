import React, { useContext } from 'react'
import cn from 'classnames'

import { WalletContext } from '../../store/wallet'

import Button from '../button'

import styles from './page-title.module.css'

const PageTitle = ({ title, button, borderBottom = true, children }) => {
  const { isAuthenticated, connectWallet } = useContext(WalletContext)

  return (
    <div className={cn(styles.container, borderBottom && styles.borderBottom)}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <div className={styles.buttonContainer}>
          {button && (
            <Button
              href={isAuthenticated() ? '/questions/ask' : '/questions/ask'}
			  onClick={() => {
				  if(!isAuthenticated())
					connectWallet();
			  }}
              primary
            >
              Ask Question
            </Button>
          )}
        </div>
      </div>
      {children && <p className={styles.summary}>{children}</p>}
      
    </div>
  )
}

export default PageTitle
