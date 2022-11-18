import { useMemo } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
} from "@chakra-ui/react";
import { omitBy, debounce } from "lodash";
import { PokedexTable } from "web/components/PokedexTable";
import { usePokedex } from "web/hooks/usePokedex";
import { ConnectButton } from "web/components/ConnectButton";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { query, push } = useRouter();
  const pokedex = usePokedex();

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
        <PokedexTable
          pokedex={pokedex?.filter(
            ({ name, types }) =>
              (!query.name ||
                name
                  .toLowerCase()
                  .includes(query.name.toString().toLowerCase())) &&
              (!query.type ||
                types
                  .toLowerCase()
                  .includes(query.type.toString().toLowerCase()))
          )}
        />
      </Box>
    </Box>
  );
};

export default Home;
