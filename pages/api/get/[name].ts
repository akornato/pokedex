// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import pokedata from "../../../data/pokemon.json";
export type Pokemon = typeof pokedata[number];

const pokemonLookup: { [name: string]: Pokemon } = pokedata.reduce(
  (pokemonLookup, pokemon) => ({
    ...pokemonLookup,
    [pokemon.name.english]: pokemon,
  }),
  {}
);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  const pokemon = pokemonLookup[req.query.name?.toString() || ""];
  if (pokemon) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).end();
  }
}
