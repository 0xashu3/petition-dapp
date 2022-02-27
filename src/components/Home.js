import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import Form from "./Form";
import { DEPETITION_CONTRACT_ADDRESS, abi } from "./constants";

const Home = (props) => {
  const walletConnected = props.walletConnected;
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState();
  const [campaignAddress, setCampaignAddress] = useState("");
  const [campaign, setCampaign] = useState({
    hash: "",
    from: "",
    to: "",
  });
  const web3ModalRef = props.web3ModalRef;
  const getProviderOrSigner = props.getProviderOrSigner;

  const createNewPetition = async (title, description) => {
    try {
      const signer = await getProviderOrSigner(true);
      const depetitionContract = new Contract(
        DEPETITION_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const tx = await depetitionContract.createNewPetition(title, description);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      setCampaign({ hash: tx.hash, from: tx.from, to: tx.to });
      console.log(tx);
      console.log(campaign);
      await returnAllPetition();
    } catch (err) {
      console.error(err);
    }
  };

  let length;
  const returnAllPetition = async () => {
    try {
      const provider = await getProviderOrSigner();
      const depetitionContract = new Contract(
        DEPETITION_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const addresses = await depetitionContract.returnAllPetition();
      console.log(addresses);
      await setAddresses(addresses);
      length = Object.values(addresses).length;
      setCampaignAddress(addresses[length - 1]);
      console.log(length, campaignAddress);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      props.connectWallet();
      returnAllPetition();
    }
  }, [walletConnected]);

  console.log(walletConnected);

  return (
    <>
      <div>
        <Form
          createNewPetition={createNewPetition}
          walletConnected={walletConnected}
          loading={loading}
          connectWallet={props.connectWallet}
          transaction={campaign}
          campaignAddress={campaignAddress}
        />
      </div>
    </>
  );
};

export default Home;
