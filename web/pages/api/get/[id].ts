import { pokemonContract } from "web/shared/contract";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tokenId = parseInt(req.query.id?.toString() || "");
    const cid = await pokemonContract.tokenURI(tokenId);
    const pokemon = await fetch(
      `https://pokemon-nft.infura-ipfs.io/ipfs/${cid}`
    ).then((res) => res.json());
    if (pokemon) {
      res.status(200).json(pokemon);
      return;
    }
    throw new Error("Not found");
  } catch {
    res.status(404).end();
  }
}
