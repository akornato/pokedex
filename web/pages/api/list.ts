import { pokemonContract } from "web/shared/contract";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Pokedex } from "web/types/Pokemon";

const pokedexPromise = pokemonContract
  .queryFilter(pokemonContract.filters.Minted())
  .then((mintedEvents) =>
    mintedEvents.reduce(
      (acc, cur) => [
        ...acc,
        {
          tokenId: cur.args[0].toString(),
          name: cur.args[1],
          types: cur.args[2],
          cidThumbnail: cur.args[3],
        },
      ],
      [] as Pokedex
    )
  );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokedex>
) {
  const pokedex = await pokedexPromise;
  const { name: nameQueryArg, type: typeQueryArg } = JSON.parse(
    req.body || "{}"
  );
  const pokemons = pokedex.filter(
    ({ name, types }) =>
      (!nameQueryArg ||
        name.toLowerCase().includes(nameQueryArg.toLowerCase())) &&
      (!typeQueryArg ||
        types.toLowerCase().includes(typeQueryArg.toLowerCase()))
  );
  res.status(200).json(pokemons);
}
