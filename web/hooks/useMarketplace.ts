import { ethers } from "ethers";
import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { useAddresses } from "web/hooks/useAddresses";
import { abi as abiPokemon } from "web/shared/Pokemon.abi.const";
import { abi as abiMarketplace } from "web/shared/Marketplace.abi.const";

type Address = `0x${string}`;

export const useMarketplace = (tokenId: ethers.BigNumber, owner?: Address) => {
  const { address: connectedAddress } = useAccount();
  const { marketplaceAddress, pokemonAddress } = useAddresses();
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

  const isApproveListEnabled =
    !isListingActive && connectedAddress && owner && connectedAddress === owner;
  const isApproved = approved === marketplaceAddress;

  const { config } = usePrepareContractWrite({
    address: pokemonAddress,
    abi: abiPokemon,
    functionName: "approve",
    args: [marketplaceAddress, tokenId],
    enabled: isApproveListEnabled && !isApproved,
  });
  const { write: approve } = useContractWrite(config);

  const { config: listItemConfig } = usePrepareContractWrite({
    address: marketplaceAddress,
    abi: abiMarketplace,
    functionName: "listItem",
    args: [pokemonAddress, tokenId, ethers.utils.parseEther("0.001")],
    enabled: isApproveListEnabled && isApproved,
  });
  const { write: listItem } = useContractWrite(listItemConfig);

  return {
    isListingActive,
    listing:
      listing && listing.seller !== ethers.constants.AddressZero
        ? {
            price: listing.price,
            seller: listing.seller,
          }
        : undefined,
    buy,
    cancelListing,
    approve,
    isApproved,
    listItem,
  };
};
