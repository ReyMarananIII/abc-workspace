const {ethers} = require("hardhat");

async function main(){
  const [deployer] = await ethers.getSigners();
  
  const initialSupply = ethers.parseUnits("1000", 18);
  const OlyContract = await await hre.ethers.deployContract("Olympus", [initialSupply,deployer.address]);
  await OlyContract.waitForDeployment();
  
  const balance = await OlyContract.balanceOf(deployer.address);
  console.log(`Balance of ${deployer.address}: ${balance.toString()}) tokens`);
  console.log(`Contract deployed to ${OlyContract.target}`);

}

main().then(()=> process.exit(0)).catch(error=>{
  console.error(error);
  process.exit(1);
});



