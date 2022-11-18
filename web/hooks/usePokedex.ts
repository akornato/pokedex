import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { useNetwork, chain as chains } from "wagmi";
import { useAddresses } from "web/hooks/useAddresses";
import { abi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { Pokedex } from "web/types/Pokemon";

export const usePokedex = () => {
  const [pokedex, setPokedex] = useState<Pokedex>();
  const { pokemonAddress } = useAddresses();
  const { chain } = useNetwork();
  const pokemonContract = useMemo(
    () =>
      new ethers.Contract(
        pokemonAddress,
        abi,
        new ethers.providers.JsonRpcProvider(
          chain?.id === chains.hardhat.id
            ? "http://127.0.0.1:8545"
            : `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
        )
      ),
    [pokemonAddress, chain]
  );

  useEffect(() => {
    const getPokedex = async () => {
      if (pokemonContract) {
        const pokedex = await pokemonContract
          .queryFilter(pokemonContract.filters.Minted())
          .then((mintedEvents) =>
            mintedEvents.reduce(
              (acc, cur) => [
                ...acc,
                {
                  tokenId: cur?.args?.[0].toString(),
                  name: cur?.args?.[1],
                  types: cur?.args?.[2],
                  cidThumbnail: cur?.args?.[3],
                },
              ],
              [] as Pokedex
            )
          );
        setPokedex(pokedex);
      }
    };
    getPokedex();
  }, [pokemonContract]);

  return pokedex;
};
