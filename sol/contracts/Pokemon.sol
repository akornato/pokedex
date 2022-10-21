// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pokemon is ERC721, ERC721URIStorage, Ownable {
    /**
     * @dev Emitted when `tokenId` is minted
     */
    event Minted(
        uint256 tokenId,
        string name,
        string types,
        string thumbnailUri
    );

    constructor() ERC721("Pokemon", "PKM") {}

    function safeMint(
        address to,
        string memory uri,
        uint256 tokenId,
        string memory name,
        string memory types,
        string memory thumbnailUri
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit Minted(tokenId, name, types, thumbnailUri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
