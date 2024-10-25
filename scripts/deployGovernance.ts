import { ethers } from 'hardhat';

async function main() {
    const kdtAddress = "0xA447B0C0290E4F1680dC56E123348ad8B7119681"; //  KDT Token address
    const quorum = ethers.utils.parseUnits("100", 18); // Define quorum as needed
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy(kdtAddress, quorum);
    await governance.deployed();

    console.log("Governance Contract deployed at:", governance.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
