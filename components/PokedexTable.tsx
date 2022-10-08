import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef } from "@chakra-ui/react";
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
import { motion, AnimatePresence } from "framer-motion";
import { base64Shimmer } from "../shared/shimmer";
import type { Pokemon } from "../types/Pokemon";

const MotionTr = motion(
  forwardRef((props, ref) => <Tr {...props} ref={ref} />)
);
MotionTr.displayName = "MotionTr";

export const PokedexTable: React.FC<{ pokedex: Pokemon[] }> = ({ pokedex }) => {
  const { query, push } = useRouter();

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
          <AnimatePresence>
            {pokedex.map(({ id, name, type, image }) => (
              <MotionTr
                key={id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{
                  filter: "brightness(1.5)",
                }}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  push({
                    pathname: `/${id}`,
                    query: {
                      ...(query.name ? { name: query.name } : {}),
                      ...(query.type ? { type: query.type } : {}),
                    },
                  })
                }
              >
                <Td>{id}</Td>
                <Td>
                  <Image
                    width={100}
                    height={100}
                    src={image.thumbnail}
                    alt="Pokemon image"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${base64Shimmer(
                      100,
                      100
                    )}`}
                  />
                </Td>
                <Td>{name.english}</Td>
                <Td>{type.reduce((acc, cur) => `${acc}, ${cur}`)}</Td>
              </MotionTr>
            ))}
          </AnimatePresence>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
