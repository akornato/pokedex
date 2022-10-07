// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import pokedex from "../../data/pokemon.json";
export type Pokemon = typeof pokedex[number];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon[]>
) {
  const { name, type } = JSON.parse(req.body);
  const pokemons = pokedex.filter(
    ({ name: nameLookup, type: typeList }) =>
      (!name ||
        Object.values(nameLookup).some((value) =>
          value.toLowerCase().includes(name.toLowerCase())
        )) &&
      (!type ||
        typeList.some((value) =>
          value.toLowerCase().includes(type.toLowerCase())
        ))
  );
  res.status(200).json(pokemons);
}
