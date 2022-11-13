import { useMemo } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { omitBy, debounce } from "lodash";
import { PokedexTable } from "web/components/PokedexTable";
import { pokemonContract } from "web/shared/contracts";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokedex } from "web/types/Pokemon";

let pokedex: Pokedex;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!pokedex) {
    pokedex = await pokemonContract
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
  }
  return {
    props: {
      pokedex: pokedex.filter(
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
    <Box p={4}>
      <Stack direction="row">
        <InputGroup>
          <InputLeftAddon>Name</InputLeftAddon>
          <Input
            type="string"
            defaultValue={query.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon>Type</InputLeftAddon>
          <Input
            type="string"
            defaultValue={query.type}
            onChange={(event) => onChange("type", event.target.value)}
          />
        </InputGroup>
      </Stack>

      <Box mt={4}>
        <PokedexTable pokedex={pokedex} />
      </Box>
    </Box>
  );
};

export default Home;
