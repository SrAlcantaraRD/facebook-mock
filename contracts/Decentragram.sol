//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Decentragram {
    string public name = "Decentragram";

    uint256 public imageCounter = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable autor;
    }

    // constructor() {
    //     console.log("Deploying a Greeter with greeting:");
    // }

    // Guardar imagen
    function uploadImages(string memory _hash, string memory _description)
        public
    {
        images[imageCounter] = Image(
            imageCounter,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );

        imageCounter++;
    }

    // Crear imagen

    // Obtener imagen
}
