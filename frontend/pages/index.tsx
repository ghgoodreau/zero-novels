import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CreateProfile } from "./components/CreateProfile";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { UserProfile } from "./components/UserProfile";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, isConnected } = useAccount();
  const profileCreated = true;
  console.log(isConnected);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <>
      <Head>
        <title>Zero Novel - Scroll zkEVM Profiles</title>
        <meta
          name="description"
          content="Privacy preserving profiles utilizing the Scroll zkEVM."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header isConnected={isConnected} profileCreated={profileCreated} />
        {!isConnected ? (
          <>
            <h2 className="text-2xl font-semibold">Login using the wallet</h2>
            <h3 className="text-xl mb-10 text-center">
              to create or manage your account!
            </h3>
          </>
        ) : null}
        <Web3Button />
        {isConnected && !profileCreated && <CreateProfile />}
        {isConnected && profileCreated && <UserProfile />}
        <Footer isLoggedIn={isConnected} />
      </main>
    </>
  );
}
