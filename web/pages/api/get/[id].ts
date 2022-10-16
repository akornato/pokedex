// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import pokedata from "../../../data/pokemon.json";
export type Pokemon = typeof pokedata[number];

const pokemonLookup: { [id: number]: Pokemon } = pokedata.reduce(
  (pokemonLookup, pokemon) => ({
    ...pokemonLookup,
    [pokemon.id]: pokemon,
  }),
  {}
);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  try {
    const pokemon = pokemonLookup[parseInt(req.query.id?.toString() || "")];
    if (pokemon) {
      res.status(200).json(pokemon);
      return;
    }
    throw new Error("Not found");
  } catch {
    res.status(404).end();
  }
}
