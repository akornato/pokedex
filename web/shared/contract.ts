import { ethers } from "ethers";
import { abi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { Pokemon } from "sol/typechain-types";

const isDevelopment = process.env.NODE_ENV === "development";

const provider = new ethers.providers.JsonRpcProvider(
  isDevelopment ? "http://127.0.0.1:8545" : process.env.ALCHEMY_URL
);

export const pokemonContract = new ethers.Contract(
  isDevelopment
    ? "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    : "0x22448d0D2a0685c713e568272de1aFc7F8BEE644",
  abi,
  provider
) as Pokemon;
