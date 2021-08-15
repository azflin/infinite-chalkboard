// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

contract InfiniteChalkboard {
    uint public cost = 0.1 ether;
    string public message;
    address payable public author;
    address public owner;

    constructor() {
      author = msg.sender;
      owner = msg.sender;
    }

    function write(string calldata _message) payable external {
        require(msg.value >= cost, "Insufficient payment.");
        message = _message;
        (bool success, ) = author.call{value: (msg.value * 109) / 110}("");
        require(success, "Transfer to previous author failed.");
        author = msg.sender;
        cost += cost / 10;
    }

    function withdraw() external {
      require(msg.sender == owner);
      (bool success, ) = owner.call{value: address(this).balance}("");
      require(success, "Withdraw failed.");
    }
}