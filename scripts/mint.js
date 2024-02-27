const {ethers} = require("hardhat");

async function main(){
  const [deployer,address] = await ethers.getSigners();
  
  const initialSupply = ethers.parseUnits("1000", 18);
  const OlyContract = await await hre.ethers.deployContract("Olympus", [initialSupply,deployer.address]);
  await OlyContract.waitForDeployment();

  const ethAmount=ethers.parseUnits("10",18);
  await OlyContract.connect(deployer).mint(address.address,ethAmount)

  const balance = await OlyContract.balanceOf(deployer.address);
  console.log("Minting successful. Balance of addr1:",balance.toString());

  console.log(`Balance of ${deployer.address}: ${balance.toString()}) tokens`);
  console.log(`Contract deployed to ${OlyContract.target}`);

}

main().then(()=> process.exit(0)).catch(error=>{
  console.error(error);
  process.exit(1);
});



