const {ethers} = require("hardhat");

async function main(){
    const [owner]= await ethers.getSigners();
    const initialSupply= ethers.parseUnits("1000", 18);
    const OlyContract = await await hre.ethers.deployContract ("Olympus", [initialSupply,owner.address]);
    await OlyContract.waitForDeployment();

    const ethAmount = ethers.parseUnits ("10", 18);
    await OlyContract.connect(owner).mint(owner.address,ethAmount)

    const ethAmountStake=ethers.parseUnits("10",18);
    await OlyContract.connect(owner).stake(ethAmountStake);

    const initialBalance = await OlyContract.balanceOf(owner.address);
    console.log("Address initial balance before withdraw", initialBalance.toString());

    const stakedBalance = await OlyContract.getStake(owner.address);
    console.log("Staking successful. Staked balance of address", stakedBalance.toString());

    await new Promise(resolve=>setTimeout(resolve,10000));
    await OlyContract.connect(owner).withdraw();

    const stakedBalanceWithdrawal = await OlyContract.getStake(owner.address);
    console.log("Withdrawal successful. Staked balance of Address after withdrawal: ", stakedBalanceWithdrawal.toString());

    const finalbalance= await OlyContract.balanceOf(owner.address);
    console.log("Final balance of address after withdrawal", finalbalance.toString());
    console.log(`Contract deployed to ${OlyContract.target}`);
}

main().then(()=> process.exit(0)).catch(error=>{
    console.error(error);
    process.exit(1);
  });

















main().then(()=> process.exit(0)).catch(error=>{
    console.error(error);
    process.exit(1);
  });