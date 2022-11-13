import { ethers, network } from "hardhat";
import { Pokemon, Marketplace } from "../typechain-types";
import mintFeed from "scripts/data/mint-feed.json";

async function main() {
  const [owner] = await ethers.getSigners();

  const MarketplaceContractFactory = await ethers.getContractFactory(
    "Marketplace"
  );
  const marketplaceContract: Marketplace =
    await MarketplaceContractFactory.deploy();
  await marketplaceContract.deployed();
  console.log(
    `Marketplace contract deployed to ${marketplaceContract.address}`
  );

  const PokemonContractFactory = await ethers.getContractFactory("Pokemon");
  const pokemonContract: Pokemon = await PokemonContractFactory.deploy(
    process.env.ROYALTY_RECEIVER_ADDRESS || owner.address, // royalty receiver
    5000 // 50% royalty
  );
  await pokemonContract.deployed();
  console.log(`Pokemon contract deployed to ${pokemonContract.address}`);

  // const pokemonContract: Pokemon = await PokemonContractFactory.attach(
  //   "0x22448d0D2a0685c713e568272de1aFc7F8BEE644"
  // );

  for (const pokemon of mintFeed.slice(0, 5)) {
    try {
      await pokemonContract.tokenURI(pokemon.tokenId);
      console.log(`Pokemon tokenId ${pokemon.tokenId} already minted`);
    } catch (e) {
      const txSafeMint = await pokemonContract.safeMint(
        owner.address,
        pokemon.cid,
        pokemon.tokenId,
        pokemon.name,
        pokemon.types,
        pokemon.cidThumbnail
      );
      await txSafeMint.wait();
      console.log(
        `Pokemon tokenId ${pokemon.tokenId} minted, tx ${txSafeMint.hash}`
      );
      const txApprove = await pokemonContract.approve(
        marketplaceContract.address,
        pokemon.tokenId
      );
      await txApprove.wait();
      console.log(
        `Pokemon tokenId ${pokemon.tokenId} approved for marketplace, tx ${txApprove.hash}`
      );
      const txListItem = await marketplaceContract.listItem(
        pokemonContract.address,
        pokemon.tokenId,
        ethers.utils.parseEther("0.001")
      );
      console.log(
        `Pokemon tokenId ${pokemon.tokenId} listed, tx ${txListItem.hash}`
      );
    }
  }

  if (network.name === "localhost") {
    const tx = await owner.sendTransaction({
      to: process.env.TEST_BUYER_ADDRESS,
      value: ethers.utils.parseEther("1.0"),
    });
    await tx.wait();
    console.log(
      `1 ETH sent to test buyer address ${process.env.TEST_BUYER_ADDRESS}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
