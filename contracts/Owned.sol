pragma solidity ^0.4.2;

contract Owned {
  // State variable
  address owner;

  // Modifiers
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // constructor
  function Owned() public {
    owner = msg.sender;
  }
}
