// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InfiniteChalkboard is Ownable {
    uint public cost = 0.1 ether;
    string public message;
    address payable public author;

    constructor() {
      author = msg.sender;
    }

    function write(string calldata _message) payable external {
        require(msg.value >= cost, "Insufficient payment.");
        require(bytes(_message).length < 100);
        message = _message;
        (bool success, ) = author.call{value: (msg.value * 109) / 110}("");
        require(success, "Transfer to previous author failed.");
        author = msg.sender;
        cost += cost / 10;
    }

    function withdraw() external onlyOwner {
      (bool success, ) = owner().call{value: address(this).balance}("");
      require(success, "Withdraw failed.");
    }
}