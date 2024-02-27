const {ethers}= require("hardhat");

async function main(){

    const [owner]=await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);
    const OlyContract = await await hre.ethers.deployContract("Olympus", [initialSupply,owner.address]);
    await OlyContract.waitForDeployment();

    const ethAmount=ethers.parseUnits("100", 18);
    await OlyContract.connect(owner).mint (owner.address, ethAmount);

    const ethAmountStake = ethers.parseUnits("10",18);
    await OlyContract.connect(owner).stake(ethAmountStake);

    const stakeBalance= await OlyContract.getStake(owner.address);
    console.log("Staking successful, Staked balance of address: ", stakeBalance.toString());

    const balance = await OlyContract.balanceOf(owner.address);
    console.log("Balance of Address", balance.toString());
}

main().then(()=> process.exit(0)).catch(error=>{
    console.error(error);
    process.exit(1);
  });