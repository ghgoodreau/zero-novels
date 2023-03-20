import "@/styles/globals.css";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

export const scroll_testnet = {
  id: 534353,
  name: 'Scroll Alpha',
  network: 'Scroll Alpha Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'GETH',
  },
  rpcUrls: {
    public: { http: ['https://alpha-rpc.scroll.io/l2'] },
    default: { http: ['https://alpha-rpc.scroll.io/l2'] },
  },
  blockExplorers: {
    etherscan: { name: 'Scroll Blockscout', url: 'https://blockscout.scroll.io' },
    default: { name: 'Scroll Blockscout', url: 'https://blockscout.scroll.io' },
  },
  // ! unsure what to put here or if this is even necessary.
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain

const chains = [mainnet, goerli, scroll_testnet]

const chainImages = {
  534353: "/scroll_logo.webp",
};

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          {/* <Header /> */}
          <Component {...pageProps} />
          {/* <Footer /> */}
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} chainImages={chainImages} />
    </>
  )
}