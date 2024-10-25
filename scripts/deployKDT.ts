import { ethers } from 'hardhat';

async function main() {
    const initialSupply = ethers.utils.parseUnits("1000", 18); // Set your initial supply
    const KDT = await ethers.getContractFactory("KDT");
    const kdt = await KDT.deploy(initialSupply);
    await kdt.deployed();
    console.log("KDT Contract Deployed at", kdt.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
