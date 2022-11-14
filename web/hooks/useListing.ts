import { ethers } from "ethers";
import { useNetwork, useContractRead } from "wagmi";
import { getMarketplaceAddress, getPokemonAddress } from "web/shared/contracts";
import { abi as marketplaceAbi } from "web/shared/Marketplace.abi.const";

export const useListing = (tokenId: ethers.BigNumber) => {
  const { chain } = useNetwork();
  const { data: listing } = useContractRead({
    address: getMarketplaceAddress(chain?.id),
    abi: marketplaceAbi,
    functionName: "getListing",
    args: [getPokemonAddress(chain?.id), tokenId],
    enabled: !!chain,
    watch: true,
    cacheTime: 3_000,
  });
  return listing && listing.seller !== ethers.constants.AddressZero
    ? {
        price: listing.price,
        seller: listing.seller,
      }
    : undefined;
};
