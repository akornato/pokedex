import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { omitBy, debounce } from "lodash";
import { PokedexTable } from "../components/PokedexTable";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokemon } from "../types/Pokemon";

const host = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(`${host}/api/list`, {
    method: "POST",
    body: JSON.stringify({
      name: query?.name?.toString() || "",
      type: query?.type?.toString() || "",
    }),
  });
  const pokedex = await res.json();
  return {
    props: { pokedex },
  };
};

const Home: NextPage<{ pokedex: Pokemon[] }> = ({ pokedex }) => {
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
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
