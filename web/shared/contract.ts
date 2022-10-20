import { ethers } from "ethers";
import { abi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { Pokemon } from "sol/typechain-types";

const isDevelopment = process.env.NODE_ENV === "development";

const provider = new ethers.providers.JsonRpcProvider(
  isDevelopment
    ? "http://127.0.0.1:8545"
    : `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

export const pokemonContract = new ethers.Contract(
  isDevelopment
    ? "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    : "0xc97E31CAff35811Ab23bc4e861202d48D7489530",
  abi,
  provider
) as Pokemon;
