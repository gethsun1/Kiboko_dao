// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IKDT {
    function balanceOf(address account) external view returns (uint256);
}

contract Governance {
    IKDT public kdt;
    uint256 public quorum;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        mapping(address => bool) voted;
    }

    constructor(address kdtAddress, uint256 _quorum) {
        kdt = IKDT(kdtAddress);
        quorum = _quorum;
    }

    function createProposal(string memory _description) external {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            executed: false
        });
    }

    function vote(uint256 _proposalId, bool support) external {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voted[msg.sender], "Already voted");

        uint256 votingPower = kdt.balanceOf(msg.sender);
        require(votingPower > 0, "Must hold KDT to vote");

        if (support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }

        proposal.voted[msg.sender] = true;
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.votesFor + proposal.votesAgainst >= quorum, "Quorum not met");
        require(!proposal.executed, "Already executed");

        proposal.executed = true;
        // Proposal execution logic
    }
}
