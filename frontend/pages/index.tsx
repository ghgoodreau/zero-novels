import { useState } from "react";
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
import { ListRecords } from "./components/ListProfiles";
import {
  ZkConnectButton,
  ZkConnectResponse,
} from "@sismo-core/zk-connect-react";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, isConnected } = useAccount();
  const [vaultID, setVaultID] = useState("");
  const profileCreated = false;
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
        {!vaultID && (
          <ZkConnectButton
            appId={"0xf2646bee3df693a1194a83b0e45d6e97"}
            onResponse={async (zkConnectResponse: ZkConnectResponse) => {
              axios
                .post(`/api/verify`, {
                  zkConnectResponse: zkConnectResponse,
                })
                .then((res) => {
                  setVaultID(res.data.vaultId);
                })
                .catch((err) => {
                  // if error then the user is not who they say they are!
                  // vault ID === signed in user. if there's a vault ID and that doesn't exist on our BE, we can create that user.
                });
            }}
          />
        )}
        <h1>vaultID: {vaultID}</h1>
        {isConnected && !profileCreated && <CreateProfile vaultID={vaultID} />}
        {isConnected && profileCreated && <UserProfile />}
        <ListRecords />
        <Footer isLoggedIn={isConnected} />
      </main>
    </>
  );
}
