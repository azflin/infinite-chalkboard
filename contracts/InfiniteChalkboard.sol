// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract InfiniteChalkboard {
    uint public cost = 0.1 ether;
    string public message;
    address payable public author;

    constructor() {
      author = msg.sender;
    }

    function write(string calldata _message) payable external {
        require(msg.value >= cost, "Insufficient payment.");
        message = _message;
        (bool success, ) = author.call{value: msg.value}("");
        require(success, "Transfer to previous author failed.");
        author = msg.sender;
    }
}