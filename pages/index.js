import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GovernanceAbi from "../artifacts/contracts/Governance.sol/Governance.json";
import KDTAbi from "../artifacts/contracts/KDT.sol/KDT.json";

export default function Home() {
    const [account, setAccount] = useState("");
    const [governanceContract, setGovernanceContract] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [newProposal, setNewProposal] = useState("");

    const governanceAddress = "YOUR_GOVERNANCE_CONTRACT_ADDRESS"; // Replace with the deployed governance contract address
    const kdtAddress = "0xA447B0C0290E4F1680dC56E123348ad8B7119681";

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setAccount(await signer.getAddress());

                const governance = new ethers.Contract(governanceAddress, GovernanceAbi.abi, signer);
                setGovernanceContract(governance);
            }
        }
        loadBlockchainData();
    }, []);

    async function createProposal() {
        if (governanceContract) {
            try {
                const tx = await governanceContract.createProposal(newProposal);
                await tx.wait();
                alert("Proposal created successfully!");
            } catch (error) {
                console.error("Proposal creation failed:", error);
            }
        }
    }

    async function vote(proposalId, support) {
        if (governanceContract) {
            try {
                const tx = await governanceContract.vote(proposalId, support);
                await tx.wait();
                alert("Vote cast successfully!");
            } catch (error) {
                console.error("Voting failed:", error);
            }
        }
    }

    return (
        <div>
            <h1>KibokoDAO Governance DApp</h1>
            <button onClick={() => window.ethereum.request({ method: "eth_requestAccounts" })}>
                {account ? `Connected: ${account}` : "Connect Wallet"}
            </button>

            <div>
                <h2>Create a Proposal</h2>
                <input
                    type="text"
                    placeholder="Proposal description"
                    value={newProposal}
                    onChange={(e) => setNewProposal(e.target.value)}
                />
                <button onClick={createProposal}>Submit Proposal</button>
            </div>

            <div>
                <h2>Existing Proposals</h2>
                {proposals.length > 0 ? (
                    proposals.map((proposal, index) => (
                        <div key={index}>
                            <p>Proposal #{proposal.id}: {proposal.description}</p>
                            <button onClick={() => vote(proposal.id, true)}>Vote For</button>
                            <button onClick={() => vote(proposal.id, false)}>Vote Against</button>
                        </div>
                    ))
                ) : (
                    <p>No proposals found</p>
                )}
            </div>
        </div>
    );
}
