import React from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  Button,
  useModal,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import WalletModal, { WalletView } from './WalletModal'

const UserMenu = () => {
  const { account, error } = useWeb3React()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const isWrongNetwork: boolean = error && error instanceof UnsupportedChainIdError

  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }

  if (account) {
    return (
      <Button onClick={onClickWalletMenu} scale="sm">
        {account.substring(0, 6)}...{account.substring(account.length - 4)}
      </Button>
    )
  }

  if (isWrongNetwork) {
    return (
      <Button onClick={onClickWalletMenu} scale="sm">
        Wrong Network
      </Button>
    )
  }

  return <ConnectWalletButton scale="sm" />
}

export default UserMenu
