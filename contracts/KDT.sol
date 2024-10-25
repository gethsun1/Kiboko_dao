// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KDT is ERC20 {
    constructor(uint256 initialSupply) ERC20("KibokoDAO Token", "KDT") {
        _mint(msg.sender, initialSupply);
    }
}
