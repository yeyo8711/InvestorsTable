// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract PV{
    struct Investor{
        string name;
        string telegram;
        string twitter;
        uint256 amount;
        address wallet;
    }

    uint256 public counter;
    address receivingWallet;

    event FundsReceived (string  _name, string  _telegram, string  _instagram, uint256 _amount, address _wallet);

    mapping(uint256 => Investor) public investors;

    constructor(address _receivingWallet){
        receivingWallet = _receivingWallet;
    }

    function sendFunds(string memory _name, string memory _telegram, string memory _twitter) public payable {
        require(msg.value > 0,"Cannot send 0 value");
        Investor storage investor = investors[counter];
        investor.amount = msg.value;
        investor.name = _name;
        investor.telegram = _telegram;
        investor.twitter = _twitter;
        investor.wallet = msg.sender;
        counter ++;
        payable(receivingWallet).transfer(msg.value);
        
        emit FundsReceived(_name, _telegram, _twitter, msg.value, msg.sender);
    }


}