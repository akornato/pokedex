import { useState, useMemo } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Progress,
} from "@chakra-ui/react";
import { chain as chains } from "wagmi";
import { omitBy, debounce } from "lodash";
import { PokedexTable } from "web/components/PokedexTable";
import { ConnectButton } from "web/components/ConnectButton";
import { getAddresses } from "web/shared/addresses";
import { abi as pokemonAbi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokedex } from "web/types/Pokemon";
import type { Pokemon } from "sol/typechain-types";

let pokedexCache: { [chainId: string]: Pokedex } = {};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const chainId =
    parseInt(query?.chainId?.toString() || "0") || chains.polygonMumbai.id;
  if (!pokedexCache[chainId]) {
    const { pokemonAddress } = getAddresses(chainId);
    const pokemonContract = new ethers.Contract(
      pokemonAddress,
      pokemonAbi,
      new ethers.providers.JsonRpcProvider(
        chainId === chains.hardhat.id
          ? "http://127.0.0.1:8545"
          : `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
      )
    ) as Pokemon;
    pokedexCache[chainId] = await pokemonContract
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
  }
  return {
    props: {
      pokedex: pokedexCache[chainId].filter(
        ({ name, types }) =>
          (!query.name ||
            name.toLowerCase().includes(query.name.toString().toLowerCase())) &&
          (!query.type ||
            types.toLowerCase().includes(query.type.toString().toLowerCase()))
      ),
    },
  };
};

const Home: NextPage<{ pokedex: Pokedex }> = ({ pokedex }) => {
  const { query, push } = useRouter();
  const [showProgress, setShowProgress] = useState(false);

  const onChange = useMemo(
    () =>
      debounce(
        (field, value) =>
          push({
            query: omitBy({ ...query, [field]: value }, (value) => !value),
          }),
        500
      ),
    [push, query]
  );

  return (
    <>
      {showProgress && (
        <Progress
          position="fixed"
          left={0}
          top={0}
          right={0}
          size="sm"
          isIndeterminate
        />
      )}
      <Box p={4}>
        <Stack direction="row">
          <InputGroup maxWidth="xs">
            <InputLeftAddon>Name</InputLeftAddon>
            <Input
              type="string"
              defaultValue={query.name}
              onChange={(event) => onChange("name", event.target.value)}
            />
          </InputGroup>

          <InputGroup maxWidth="xs">
            <InputLeftAddon>Type</InputLeftAddon>
            <Input
              type="string"
              defaultValue={query.type}
              onChange={(event) => onChange("type", event.target.value)}
            />
          </InputGroup>
          <Spacer />
          <ConnectButton />
        </Stack>

        <Box mt={4}>
          <PokedexTable pokedex={pokedex} setShowProgress={setShowProgress} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
