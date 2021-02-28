import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Connection, SystemProgram, TransactionInstruction,PublicKey, clusterApiUrl, Transaction } from '@solana/web3.js';
import { FetchContext } from '../../store/fetch'
import { WalletContext } from '../../store/wallet'
import ModalContext from '../../store/modal'

import TextArea from '../textarea'
import Button from '../button'
import Tag from '../tag'

import styles from './add-answer.module.css'

const AddAnswer = ({ id, tags, setQuestion, walletId }) => {
  const { authAxios } = useContext(FetchContext)
  const { handleComponentVisible } = useContext(ModalContext)
  const { walletState, getWallet } = useContext(WalletContext)


  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {

			let connection = new Connection(clusterApiUrl('devnet'));
			let wallet = getWallet();		
			let transaction = SystemProgram.transfer({
				fromPubkey: wallet.publicKey,
				toPubkey: new PublicKey(walletId),
				lamports: 1,
			});

			let { blockhash } = await connection.getRecentBlockhash();
			transaction.recentBlockhash = blockhash;
			let signed = await wallet.signTransaction(transaction);
			let txid = await connection.sendRawTransaction(signed.serialize());			
			let confirmedTransaction = await connection.confirmTransaction(txid);

          const { data } = await authAxios.post(`/answer/${id}`, values)
          setQuestion(data)
          resetForm({})
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .required('Body is missing.')
          .min(30, 'Body must be at least 30 characters.')
          .max(30000, 'Body cannot be longer than 30000 characters.')
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className={styles.container} onSubmit={handleSubmit}>
          <h2>Your answer</h2>
          <TextArea
            name="text"
            autoComplete="off"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.text && errors.text}
            errorMessage={errors.text && errors.text}
            className={styles.textarea}
          />
          <p className={styles.status}>{status}</p>
          <div className={styles.button}>
            <Button
              type="submit"
              primary
              isLoading={loading}
              disabled={isSubmitting}
              onClick={() => !walletState.connected && handleComponentVisible(true, 'signup')}
            >
              Post Your Answer
            </Button>
          </div>
          <h3>
            Browse other questions tagged &nbsp;
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            or &nbsp;
            <Link href="/questions/ask" as="/questions/ask">
              <a>ask your own question.</a>
            </Link>
          </h3>
        </form>
      )}
    </Formik>
  )
}

export default AddAnswer
