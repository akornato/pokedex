import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import type { Pokemon } from "../types/Pokemon";

export const PokedexTable: React.FC<{ pokedex: Pokemon[] }> = ({ pokedex }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Pokedex</TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pokedex.map(({ id, name, type, image }) => (
            <Tr key={id}>
              <Td>{id}</Td>
              <Td>
                <img src={image.thumbnail} alt="Pokemon image" />
              </Td>
              <Td>{name.english}</Td>
              <Td>{type.reduce((acc, cur) => `${acc}, ${cur}`)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
