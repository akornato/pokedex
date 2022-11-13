import { ethers } from "ethers";
import { abi as marketplaceAbi } from "sol/artifacts/contracts/Marketplace.sol/Marketplace.json";
import { abi as pokemonAbi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { Marketplace, Pokemon } from "sol/typechain-types";

const isDevelopment = process.env.NODE_ENV === "development";

const provider:
  | ethers.providers.Web3Provider
  | ethers.providers.JsonRpcProvider =
  typeof window !== "undefined"
    ? // @ts-ignore
      new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider(
        isDevelopment ? "http://127.0.0.1:8545" : process.env.ALCHEMY_URL
      );

export const marketplaceContract = new ethers.Contract(
  isDevelopment
    ? "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
    : "0x22448d0D2a0685c713e568272de1aFc7F8BEE644",
  marketplaceAbi,
  provider
) as Marketplace;

export const pokemonContract = new ethers.Contract(
  isDevelopment
    ? "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    : "0x22448d0D2a0685c713e568272de1aFc7F8BEE644",
  pokemonAbi,
  provider
) as Pokemon;
