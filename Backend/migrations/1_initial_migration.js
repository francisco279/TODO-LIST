//Deploy the contract

const TaskContract = artifacts.require("taskContract");

module.exports = function(deployer)
{
    deployer.deploy(TaskContract);
}