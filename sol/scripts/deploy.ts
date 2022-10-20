import { ethers } from "hardhat";
import { Pokemon } from "../typechain-types";
import mintFeed from "scripts/data/mint-feed.json";

async function main() {
  const PokemonContractFactory = await ethers.getContractFactory("Pokemon");
  const pokemonContract: Pokemon = await PokemonContractFactory.deploy();
  await pokemonContract.deployed();
  console.log(`Pokemon contract deployed to ${pokemonContract.address}`);

  const [owner] = await ethers.getSigners();

  for (const pokemon of mintFeed.filter((_, index) => index >= 107)) {
    await pokemonContract.safeMint(
      owner.address,
      pokemon.cid,
      pokemon.tokenId,
      pokemon.name,
      pokemon.types,
      pokemon.cidThumbnail,
      { gasLimit: 300000 }
    );
    console.log(`Pokemon tokenId ${pokemon.tokenId} minted`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
