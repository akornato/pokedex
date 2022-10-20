import fs from "fs-extra";
import { create, urlSource } from "ipfs-http-client";
import * as dotenv from "dotenv";
dotenv.config();
import pokedex from "./data/pokedex.json" assert { type: "json" };

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:
      "Basic " +
      Buffer.from(
        process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_API_KEY_SECRET
      ).toString("base64"),
  },
});

const mintFeedPath = `./data/mint-feed.json`;
async function main() {
  const mintFeed = fs.readJsonSync(mintFeedPath, { throws: false }) || [];
  const filteredPokedox = pokedex.filter(
    (_, index) => index >= mintFeed.length
  );
  for (const pokemon of filteredPokedox) {
    const { cid: cidThumbnail } = await ipfs.add(
      urlSource(pokemon.image?.thumbnail)
    );
    const { cid: cidHires } = pokemon.image?.hires
      ? await ipfs.add(urlSource(pokemon.image?.hires))
      : { cid: cidThumbnail };
    const name = pokemon.name.english;
    const types = pokemon.type.reduce((acc, cur) => `${acc}, ${cur}`);
    const pokemonMeta = {
      name,
      image: cidHires.toString(),
      description: pokemon.description,
      attributes: [
        {
          trait_type: "Types",
          value: types,
        },
        ...Object.entries(pokemon.base || {}).map(([key, value]) => ({
          trait_type: key,
          value,
        })),
      ],
    };
    const { cid: cidPokemonMeta } = await ipfs.add(JSON.stringify(pokemonMeta));
    mintFeed.push({
      cid: cidPokemonMeta.toString(),
      tokenId: pokemon.id,
      name,
      types,
      cidThumbnail: cidThumbnail.toString(),
    });
    console.log(`Pokemon tokenId ${pokemon.id} added to mint feed`);
    fs.outputJsonSync(mintFeedPath, mintFeed);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
