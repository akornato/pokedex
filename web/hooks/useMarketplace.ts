import { ethers } from "ethers";
import {
  useNetwork,
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { getAddresses } from "web/shared/addresses";
import { abi as abiPokemon } from "web/shared/Pokemon.abi.const";
import { abi as abiMarketplace } from "web/shared/Marketplace.abi.const";

export const useMarketplace = (tokenId: ethers.BigNumber) => {
  const { chain } = useNetwork();
  const { address: connectedAddress } = useAccount();
  const { marketplaceAddress, pokemonAddress } = getAddresses(chain?.id);
  const { data: listing } = useContractRead({
    address: marketplaceAddress,
    abi: abiMarketplace,
    functionName: "getListing",
    args: [pokemonAddress, tokenId],
    watch: true,
    cacheTime: 3_000,
  });
  const isListingActive =
    listing &&
    listing.seller &&
    listing.seller !== ethers.constants.AddressZero;

  const buyItemEnabled =
    isListingActive && connectedAddress && connectedAddress !== listing.seller;
  const { config: buyItemConfig } = usePrepareContractWrite({
    address: marketplaceAddress,
    abi: abiMarketplace,
    functionName: "buyItem",
    args: [pokemonAddress, tokenId],
    overrides: {
      value: listing?.price,
    },
    enabled: buyItemEnabled,
  });
  const { write: buy } = useContractWrite(buyItemConfig);

  const { data: owner } = useContractRead({
    address: pokemonAddress,
    abi: abiPokemon,
    functionName: "ownerOf",
    args: [tokenId],
    watch: true,
    cacheTime: 3_000,
  });

  const cancelListingEnabled =
    isListingActive && connectedAddress && connectedAddress === owner;
  const { config: cancelListingConfig } = usePrepareContractWrite({
    address: marketplaceAddress,
    abi: abiMarketplace,
    functionName: "cancelListing",
    args: [pokemonAddress, tokenId],
    enabled: cancelListingEnabled,
  });
  const { write: cancelListing } = useContractWrite(cancelListingConfig);

  const { data: approved } = useContractRead({
    address: pokemonAddress,
    abi: abiPokemon,
    functionName: "getApproved",
    args: [tokenId],
    watch: true,
    cacheTime: 3_000,
  });

  const isApproveEnabled =
    !isListingActive &&
    connectedAddress &&
    owner &&
    connectedAddress === owner &&
    approved !== marketplaceAddress;
  const { config } = usePrepareContractWrite({
    address: pokemonAddress,
    abi: abiPokemon,
    functionName: "approve",
    args: [marketplaceAddress, tokenId],
    enabled: isApproveEnabled,
  });
  const { write: approve } = useContractWrite(config);

  const isListItemEnabled =
    !isListingActive &&
    connectedAddress &&
    owner &&
    connectedAddress === owner &&
    approved === marketplaceAddress;
  const { config: listItemConfig } = usePrepareContractWrite({
    address: marketplaceAddress,
    abi: abiMarketplace,
    functionName: "listItem",
    args: [pokemonAddress, tokenId, ethers.utils.parseEther("0.001")],
    enabled: isListItemEnabled,
  });
  const { write: listItem } = useContractWrite(listItemConfig);

  return {
    owner,
    listing: isListingActive
      ? {
          price: listing.price,
          seller: listing.seller,
        }
      : undefined,
    buy: buyItemEnabled ? buy : undefined,
    cancelListing: cancelListingEnabled ? cancelListing : undefined,
    approve: isApproveEnabled ? approve : undefined,
    listItem: isListItemEnabled ? listItem : undefined,
  };
};
