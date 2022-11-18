import { chain as chains, useNetwork } from "wagmi";
import { address as hardhatMarketplaceAddress } from "sol/deploy/Marketplace.localhost.json";
import { address as mumbaiMarketplaceAddress } from "sol/deploy/Marketplace.mumbai.json";
import { address as hardhatPokemonAddress } from "sol/deploy/Pokemon.localhost.json";
import { address as mumbaiPokemonAddress } from "sol/deploy/Pokemon.mumbai.json";

type Address = `0x${string}`;

export const useAddresses = () => {
  const { chain } = useNetwork();
  return chain?.id === chains.hardhat.id
    ? {
        marketplaceAddress: hardhatMarketplaceAddress as Address,
        pokemonAddress: hardhatPokemonAddress as Address,
      }
    : {
        marketplaceAddress: mumbaiMarketplaceAddress as Address,
        pokemonAddress: mumbaiPokemonAddress as Address,
      };
};
