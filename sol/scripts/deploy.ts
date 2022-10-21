import { ethers } from "hardhat";
import { Pokemon } from "../typechain-types";
import mintFeed from "scripts/data/mint-feed.json";

async function main() {
  const [owner] = await ethers.getSigners();

  const PokemonContractFactory = await ethers.getContractFactory("Pokemon");
  const pokemonContract: Pokemon = await PokemonContractFactory.deploy();
  await pokemonContract.deployed();
  console.log(`Pokemon contract deployed to ${pokemonContract.address}`);

  // const pokemonContract: Pokemon = await PokemonContractFactory.attach(
  //   "0x22448d0D2a0685c713e568272de1aFc7F8BEE644"
  // );

  for (const pokemon of mintFeed) {
    try {
      await pokemonContract.tokenURI(pokemon.tokenId);
      console.log(`Pokemon tokenId ${pokemon.tokenId} already minted`);
    } catch (e) {
      const tx = await pokemonContract.safeMint(
        owner.address,
        pokemon.cid,
        pokemon.tokenId,
        pokemon.name,
        pokemon.types,
        pokemon.cidThumbnail
      );
      console.log(`Pokemon tokenId ${pokemon.tokenId} minted, tx ${tx.hash}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
