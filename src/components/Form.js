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

  const displayLinks = () => {
    if (transaction.hash !== "") {
      return (
        <div className="container">
          <a href={transaction.url}>View Transaction On Etherscan</a>
          <a href={transaction.campaignurl}>Campaign Link</a>
          {transaction.from}
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Create A New Petition</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
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
            Description
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
  );
};

export default Form;
