import React from "react";
import Web3Modal from "web3modal";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { petitionAbi } from "./constants";
import { useParams } from "react-router-dom";

const Petition = (props) => {
  let { address } = useParams();

  const CAMPAIGN_ADDRESS = address;
  const walletConnected = props.walletConnected;
  const getProviderOrSigner = props.getProviderOrSigner;

  const [loading, setLoading] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [n, setN] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const web3ModalRef = props.web3ModalRef;

  const signPetition = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const petitionContract = new Contract(
        CAMPAIGN_ADDRESS,
        petitionAbi,
        signer
      );
      const tx = await petitionContract.sign();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      setHasSigned(true);
      getNumberOfSignitures();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTitle = async () => {
    try {
      const provider = await getProviderOrSigner();
      const petitionContract = new Contract(
        CAMPAIGN_ADDRESS,
        petitionAbi,
        provider
      );
      const title = await petitionContract.title();
      const description = await petitionContract.description();
      setTitle(title);
      setDescription(description);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfSignedAddress = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const petitionContract = new Contract(
        CAMPAIGN_ADDRESS,
        petitionAbi,
        signer
      );
      const signerAddress = await signer.getAddress();
      console.log(signerAddress);
      const tx = await petitionContract.hasSigned(signerAddress);
      console.log(tx);
      setHasSigned(tx);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumberOfSignitures = async () => {
    try {
      const provider = await getProviderOrSigner();
      const petitionContract = new Contract(
        CAMPAIGN_ADDRESS,
        petitionAbi,
        provider
      );
      const _noOfSignatures = await petitionContract.getNumberOfSignitures();
      const hexString = _noOfSignatures._hex.toString(16);
      setN(parseInt(hexString, 16));

      console.log(n);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      props.connectWallet();

      getNumberOfSignitures();
      checkIfSignedAddress();
      fetchTitle();
    }
  }, []);

  const renderButton = () => {
    if (walletConnected) {
      if (hasSigned) {
        return (
          <>
            <div>Thanks for signing the Petition!</div>
            <div className="p-3">
              Share petition link with your friends: {contracturl}
            </div>
          </>
        );
      } else if (loading) {
        return (
          <button type="button" className="btn btn-primary btn-lg">
            Waiting For Confirmation...
          </button>
        );
      } else {
        return (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={signPetition}
          >
            Sign the Petition
          </button>
        );
      }
    } else {
      return (
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.connectWallet}
        >
          Connect your wallet
        </button>
      );
    }
  };

  console.log(walletConnected);

  const etherscancontracturl = `https://rinkeby.etherscan.io/address/${CAMPAIGN_ADDRESS}`;
  const contracturl = `https://unipetition.vercel.app/${CAMPAIGN_ADDRESS}`;

  const content = () => {
    if (walletConnected) {
      return (
        <div>
          <div className="container text-center w-50">
            <p>
              Petiton Smart Contract:{" "}
              <a
                href={etherscancontracturl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CAMPAIGN_ADDRESS}
              </a>{" "}
            </p>

            <h1>{title}</h1>
            <p className="p-3">{description}</p>
            <p className="fw-bold">Supporters: {n}</p>
            {renderButton()}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="container text-center">
            Please connect your metamask wallet and switch to Rinkeby Network to
            sign this petition
            <div className="text-center p-3"> {renderButton()}</div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className=" my-3">{content()}</div>
    </>
  );
};

export default Petition;
