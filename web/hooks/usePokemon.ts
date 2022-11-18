import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork, useContractRead } from "wagmi";
import { getAddresses } from "web/shared/addresses";
import { abi } from "web/shared/Pokemon.abi.const";
import type { Pokemon } from "web/types/Pokemon";

export const usePokemon = (tokenId: ethers.BigNumber) => {
  const { chain } = useNetwork();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { pokemonAddress } = getAddresses(chain?.id);
  const { data: owner } = useContractRead({
    address: pokemonAddress,
    abi,
    functionName: "ownerOf",
    args: [tokenId],
  });
  const { data: cid } = useContractRead({
    address: pokemonAddress,
    abi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    if (cid) {
      fetch(`https://pokemon-nft.infura-ipfs.io/ipfs/${cid}`)
        .then((res) => res.json())
        .then(setPokemon);
    }
  }, [cid]);

  return { pokemon, owner };
};
