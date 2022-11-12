// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract Pokemon is ERC721URIStorage, ERC721Royalty {
    event Minted(
        uint256 tokenId,
        string name,
        string types,
        string thumbnailUri
    );

    constructor(address royaltyReceiver, uint96 royaltyFeeNumerator)
        ERC721("Pokemon", "PKM")
    {
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Royalty)
        returns (bool)
    {
        return
            ERC721.supportsInterface(interfaceId) ||
            ERC721Royalty.supportsInterface(interfaceId);
    }

    function safeMint(
        address to,
        string memory uri,
        uint256 tokenId,
        string memory name,
        string memory types,
        string memory thumbnailUri
    ) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit Minted(tokenId, name, types, thumbnailUri);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721URIStorage, ERC721Royalty)
    {
        ERC721URIStorage._burn(tokenId);
        ERC721Royalty._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage, ERC721)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }
}
