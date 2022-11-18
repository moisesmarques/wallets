// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract UBQFitCoin is ERC1155 {
    uint256 public constant UBQFit = 0;

    constructor() ERC1155("https://ipfs.io/ipfs/QmSJTA1d6dvc2vD5sM5U4cCidrSY2u3QRzAXebW1gkzX4e") { 
        _mint(msg.sender, UBQFit, 10**10, "");
    }

}