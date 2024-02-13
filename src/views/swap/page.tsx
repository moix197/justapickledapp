// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import { SendTransaction } from '../../components/SendTransaction';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';


export function esto() {

  return (
    <div className="md:hero mx-auto p-4 w-full h-full flex justify-center items-center">
    </div>
  );
};
