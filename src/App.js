import "./App.css";
import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { providers } from "ethers";
import { Home, Petition, LandingPage } from "./components/Index";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const host = "http://localhost:3000";

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/app"
          element={
            <Home
              walletConnected={walletConnected}
              getProviderOrSigner={getProviderOrSigner}
              connectWallet={connectWallet}
              web3ModalRef={web3ModalRef}
            />
          }
        />
        <Route exact path="/" element={<LandingPage host={host} />} />
        <Route
          exact
          path="/:address"
          element={
            <Petition
              walletConnected={walletConnected}
              getProviderOrSigner={getProviderOrSigner}
              connectWallet={connectWallet}
              web3ModalRef={web3ModalRef}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
