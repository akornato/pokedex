import { pokemonContract, marketplaceContract } from "web/shared/contract";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tokenId = parseInt(req.query.id?.toString() || "");
    const [pokemon, listing] = await Promise.all([
      pokemonContract
        .tokenURI(tokenId)
        .then((cid) =>
          fetch(`https://pokemon-nft.infura-ipfs.io/ipfs/${cid}`).then((res) =>
            res.json()
          )
        ),
      marketplaceContract
        .getListing(pokemonContract.address, tokenId)
        .catch(() => {}),
    ]);
    if (pokemon) {
      res.status(200).json({
        pokemon,
        ...(listing
          ? {
              listing: {
                price: listing[0].toString(),
                seller: listing[1],
              },
            }
          : {}),
      });
      return;
    }
    throw new Error("Not found");
  } catch {
    res.status(404).end();
  }
}
