import React from "react";
import Footer from "./Footer";
import Logo from "./Logo";

const LandingPage = () => {
  return (
    <>
      {" "}
      <div className="container">
        {" "}
        <Logo />{" "}
      </div>
      <div className="upper-nav d-flex  justify-content-center"></div>
      <div className="d-flex justify-content-center p-5 my-1">
        <div className="content-box ">
          <h1 className="display-2 fw-bold text-center">
            Raise Your Voice Fearlessly{" "}
          </h1>
          <div className="container w-50">
            <p className="text-center p-4  lead">
              Unipetition allows you create decentralised petitions. Every
              petition has a unique smart contract address when supporters can
              sign the petition. It is designed to be censor-resistant and 100%
              transparent.
            </p>
          </div>

          <div className="d-flex justify-content-center cta">
            <div>
              <a
                href="/app"
                className="btn btn-primary mx-5 btn-lg"
                role="button"
              >
                Start a Petition Now
              </a>
              <a
                href="https://rinkeby.etherscan.io/address/0xce6dca43bcb81259e7d53316aa09dee0039d80b8"
                className="btn btn-primary btn-lg"
                role="button"
                rel="noreferrer"
                target="_blank"
              >
                View Contract on Etherscan
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
