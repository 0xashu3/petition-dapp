import React, { useState } from "react";

const Form = (props) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    props.createNewPetition(campaign.title, campaign.description);

    setCampaign({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const transaction = {
    hash: props.transaction.hash,
    from: props.transaction.from,
    to: props.transaction.to,
    url: `https://rinkeby.etherscan.io/tx/${props.transaction.hash}`,
    campaignurl: `http://localhost:3000/${props.campaignAddress}`,
  };

  const renderAlert = () => {
    if (props.walletConnected) {
      if (props.loading) {
        return (
          <div className="alert alert-secondary text-center" role="alert">
            Waiting For Transaction Confirmation...{" "}
          </div>
        );
      } else {
        return (
          <div className="alert alert-success text-center" role="alert">
            Success, Your wallet is connected! Create Your Campaign Below.
          </div>
        );
      }
    } else {
      return (
        <div className="alert alert-danger text-center" role="alert">
          Please connect your metamask wallet and switch to Rinkeby Network to
          create campaign!{" "}
        </div>
      );
    }
  };

  const displayLinks = () => {
    if (transaction.hash !== "") {
      return (
        <div className="container my-3">
          <div className="container my-3">
            <a href={transaction.campaignurl}>Campaign Link</a>
          </div>
          <div className="container my-3">
            <a href={transaction.url}>View Transaction On Etherscan</a>
          </div>
          <div className="container my-3">Creator: {transaction.from}</div>
        </div>
      );
    }
  };

  return (
    <div>
      {renderAlert()}
      <div className="container align-items-center">
        <h1>Create A New Petition</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Petition Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={campaign.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Petiton Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={campaign.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button
            disabled={
              campaign.title.length < 5 || campaign.description.length < 5
            }
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Create Campaign
          </button>
        </form>
        {displayLinks()}
      </div>
    </div>
  );
};

export default Form;
