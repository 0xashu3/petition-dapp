//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Petition {

  address owner;
  address[] signers;

  string public title;
  string public description;

  mapping(address=>bool) public hasSigned;

  constructor(address creator, string memory _title, string memory _description) {
    owner = creator;
    title = _title;
    description = _description;
  }

  function sign() public {
    require(hasSigned[msg.sender]==false, "You have already signed this petition.");
    hasSigned[msg.sender] = true;
    signers.push(msg.sender);
  }
  
  function checkIfSigned () public view returns(bool) {
    return hasSigned[msg.sender];
  }

  function getNumberOfSignitures () public view returns(uint256) {
    return signers.length;
  }

}