Video Link: https://www.youtube.com/watch?v=FsuVyJOJa28

Live Demo Link: https://unipetition.vercel.app/ (Use Metamask wallet to interact with our app)

PPT: https://docs.google.com/presentation/d/15Gwb7dv4b9xSm8zoHdd1BT6adSTgR6hV/edit?usp=sharing&ouid=109721044222185215701&rtpof=true&sd=true

idea: decentralized petition app powered by blockchain

Tech Stack Used:
React.js, Solidity, Hardhat, metamask, Ethers.js

#Team Details
team code:29acac8bd9
team name: errors
if fresher: True

#description of idea

problem:
Online Petition Platforms are important to empowers common people to bring social or political cause in public and make a change. But all these online platforms (eg. change.org) are centralised and are controlled by centralised companies.

Most petitions are against governments and big campanies which can force the platform to pull down petition if they don't like. For eg, recently the Canada govt pulled down gofundme page where people were protesting online.

The other problem is that the platforms can even manipulate the numbers of signatures. There is no way to validate transactions. The centralized petition signing system is not transparent. Also, these platforms collect our personal data like email which some of us may not want to share.

Solution:
Unipetition is the solution which allows users to create decentralized petitions. Each petition is has a unique smart contract address on the blockchain and it stores title and description of campaign. The supporters of petition can sign petition by interacting with the smart contract through their wallets. Each signature is actually a transaction on the smart contract and blockchain.

Since all the data like campaign title, description and signatures are stored on the blockchain, no one can remove them because all the transactions are immutable.

If someone doesn't want to run petition on our website, they can fetch the petition title, description and no of signatures from the smart contract and run it on their own website. So anyone can fetch details from the contract create a frontend based on our contract.

All the signatures are public and can be viewed on etherscan. If frontend creator tried to manipulate with no. of signatures, they can be caught easily.

Censors can actually pull down our entire frontend website. But they cannot remove smart contracts petitions and signatures. In that case, some other developer can create frontend by fetching data from the same smart contract. Thus, unipetition is censor-resistant.
