import React, { createContext, useState, useEffect } from 'react'
import Modal from '../components/modal'
import Button from '../components/button'

import { Transaction } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";

const WalletContext = createContext()
const { Provider } = WalletContext

const ASSETS_URL = "https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/";

const WALLET_PROVIDERS = [
	{
	  name: "Sollet",
	  url: "",
	  icon: `${ASSETS_URL}sollet.svg`,
	}]


const WalletProvider = ({ children }) => 
{

  const [walletState, setWalletState] = useState({})

  useEffect(() => {
   	const wallet = new Wallet("https://www.sollet.io");

	wallet.on('connect', publicKey => 
	{ 
		console.log('Connected to ' + publicKey.toBase58())
		setWalletState({connected: true, publicKey, wallet});
	});

	wallet.on('disconnect', () => 
	{
		console.log('Disconnected')
		setWalletState({connected: false, wallet});
	});
    
	const connected = localStorage.getItem('connected') || false;
    const provider = localStorage.getItem('provider') || WALLET_PROVIDERS[0];

    setWalletState({
	  wallet,
      provider,
      connected,
    })
  }, [])

  const getWallet = () => {
	  return walletState.wallet;
  }

  const connectWallet = () => {
	getWallet().connect();
  };

  const isAuthenticated = () => 
  {
    return walletState.connected;
  }

  const isAdmin = () => {
    return false;
  }

  return (
    <Provider
      value={{
        walletState,
		getWallet,
		connectWallet,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </Provider>
  )
}

export { WalletContext, WalletProvider, WALLET_PROVIDERS }
