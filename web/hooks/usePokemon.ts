import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import { useAddresses } from "web/hooks/useAddresses";
import { abi } from "web/shared/Pokemon.abi.const";
import type { Pokemon } from "web/types/Pokemon";

export const usePokemon = (tokenId: ethers.BigNumber) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { pokemonAddress } = useAddresses();
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
