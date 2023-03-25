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
import UserPage from "./profile/[uid]";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ZkConnectButton,
  ZkConnectResponse,
} from "@sismo-core/zk-connect-react";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home(props: { vaultId: any; userProfile: any; checkingProfile: any; handleLogout: any; }) {
  const { vaultId, userProfile, checkingProfile, handleLogout } = props;
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const isLoggedIn = !!vaultId;
  console.log(userProfile)
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
        {!isLoggedIn ? (
          <>
            <h2 className="text-2xl font-semibold">Login above using Sismo</h2>
            <h3 className="text-xl mb-10 text-center">
              to create or manage your account!
            </h3>
          </>
        ) : null}
        {checkingProfile && <h2 className="text-2xl font-semibold">Checking profile...</h2>}
        {isLoggedIn && userProfile && !checkingProfile && <UserProfile userProfile={userProfile} vaultID={vaultId} handleLogout={handleLogout} />}
        {!checkingProfile && isLoggedIn && !userProfile && <CreateProfile vaultID={vaultId} />}
      </main>
    </>
  );
}
