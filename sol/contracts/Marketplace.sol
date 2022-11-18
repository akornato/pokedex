// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract Marketplace {
    struct Listing {
        uint256 price;
        address seller;
    }

    event ItemListed(
        address indexed NFTAddress,
        uint256 indexed tokenId,
        address indexed sellerAddress,
        uint256 price
    );

    event ItemCancelled(
        address indexed NFTAddress,
        uint256 indexed tokenId,
        address indexed sellerAddress
    );

    event ItemBought(
        address indexed NFTAddress,
        uint256 indexed tokenId,
        address indexed sellerAddress,
        uint256 price
    );

    modifier isNFTOwner(
        address NFTAddress,
        uint256 tokenId,
        address sender
    ) {
        require(
            IERC721(NFTAddress).ownerOf(tokenId) == sender,
            "Sender is not NFT owner"
        );
        _;
    }

    modifier isListed(address NFTAddress, uint256 tokenId) {
        require(
            listings[NFTAddress][tokenId].seller != address(0),
            "NFT not listed"
        );
        _;
    }

    mapping(address => mapping(uint256 => Listing)) private listings;

    function listItem(
        address NFTAddress,
        uint256 tokenId,
        uint256 price
    ) external isNFTOwner(NFTAddress, tokenId, msg.sender) {
        require(
            IERC721(NFTAddress).getApproved(tokenId) == address(this),
            "Not approved for marketplace"
        );
        listings[NFTAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(NFTAddress, tokenId, msg.sender, price);
    }

    function cancelListing(address NFTAddress, uint256 tokenId)
        external
        isNFTOwner(NFTAddress, tokenId, msg.sender)
        isListed(NFTAddress, tokenId)
    {
        address seller = listings[NFTAddress][tokenId].seller;
        delete (listings[NFTAddress][tokenId]);
        emit ItemCancelled(NFTAddress, tokenId, seller);
    }

    function buyItem(address NFTAddress, uint256 tokenId)
        external
        payable
        isListed(NFTAddress, tokenId)
    {
        Listing memory listedItem = listings[NFTAddress][tokenId];

        require(
            listedItem.price == msg.value,
            "Value sent is different to listed item price."
        );

        delete (listings[NFTAddress][tokenId]);

        address royaltyReceiver;
        uint256 royaltyAmount;
        (royaltyReceiver, royaltyAmount) = IERC2981(NFTAddress).royaltyInfo(
            tokenId,
            listedItem.price
        );

        payable(listedItem.seller).transfer(listedItem.price - royaltyAmount);
        payable(royaltyReceiver).transfer(royaltyAmount);

        IERC721(NFTAddress).safeTransferFrom(
            listedItem.seller,
            msg.sender,
            tokenId
        );

        emit ItemBought(
            NFTAddress,
            tokenId,
            listedItem.seller,
            listedItem.price
        );
    }

    function getListing(address NFTAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return listings[NFTAddress][tokenId];
    }
}
