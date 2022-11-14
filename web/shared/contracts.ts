import { ethers } from "ethers";
import { chain as chains } from "wagmi";
import { address as hardhatMarketplaceAddress } from "sol/deploy/Marketplace.localhost.json";
import { address as mumbaiMarketplaceAddress } from "sol/deploy/Marketplace.mumbai.json";
import { address as hardhatPokemonAddress } from "sol/deploy/Pokemon.localhost.json";
import { address as mumbaiPokemonAddress } from "sol/deploy/Pokemon.mumbai.json";
import { abi as marketplaceAbi } from "sol/artifacts/contracts/Marketplace.sol/Marketplace.json";
import { abi as pokemonAbi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { Marketplace, Pokemon } from "sol/typechain-types";

const jsonRpcProvider = {
  [chains.polygonMumbai.id]: new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_URL
  ),
  [chains.hardhat.id]: new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  ),
};

const marketPlaceAddresses = {
  [chains.polygonMumbai.id]: mumbaiMarketplaceAddress,
  [chains.hardhat.id]: hardhatMarketplaceAddress,
};

const pokemonAddresses = {
  [chains.polygonMumbai.id]: mumbaiPokemonAddress,
  [chains.hardhat.id]: hardhatPokemonAddress,
};

const defaultChainId =
  process.env.NODE_ENV === "development"
    ? chains.hardhat.id
    : chains.polygonMumbai.id;

export const getMarketplaceContract = (chainId?: number) =>
  new ethers.Contract(
    marketPlaceAddresses[chainId || defaultChainId],
    marketplaceAbi,
    jsonRpcProvider[chainId || defaultChainId]
  ) as Marketplace;

export const getPokemonContract = (chainId?: number) =>
  new ethers.Contract(
    pokemonAddresses[chainId || defaultChainId],
    pokemonAbi,
    jsonRpcProvider[chainId || defaultChainId]
  ) as Pokemon;
