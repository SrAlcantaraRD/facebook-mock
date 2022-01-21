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

    event ImageCreate(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable autor
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable autor
    );

    // constructor() {
    //     console.log("Deploying a Greeter with greeting:");
    // }

    // Guardar imagen
    function uploadImages(string memory _hash, string memory _description)
        public
    {
        require(bytes(_description).length > 0, "Define a 'description'");
        require(bytes(_hash).length > 0, "Define a 'hash'");

        images[imageCounter] = Image(
            imageCounter,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );

        emit ImageCreate(
            imageCounter,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );

        imageCounter++;
    }

    // Crear imagen
    function tipImageOwner(uint256 _id) public payable {
        require(_id >= 0, "Image ID cannot be lower than 0");
        require(_id < imageCounter, "Image ID not available");

        // Obtener la imagen
        Image memory _image = images[_id];

        // Obtener el autor de la imagen
        address payable _autor = _image.autor;

        _image.tipAmount += msg.value;
        images[_id] = _image;

        // Pagar al autor
        _autor.transfer(msg.value);

        emit ImageTipped(
            _image.id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            payable(msg.sender)
        );
    }

}
