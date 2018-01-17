var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PhotoContract = artifacts.require("./PhotoContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PhotoContract);
};
