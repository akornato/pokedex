import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef } from "@chakra-ui/react";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Text,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { base64Shimmer } from "../shared/shimmer";
import { host } from "../shared/host";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokemon } from "../types/Pokemon";

const MotionBox = motion(
  forwardRef((props, ref) => <Box {...props} ref={ref} />)
);
MotionBox.displayName = "MotionBox";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const pokemon = await fetch(`${host}/api/get/${query.id}`).then((res) =>
    res.json()
  );

  res.setHeader("Cache-Control", "public, s-maxage=3600");

  return {
    props: { pokemon },
  };
};

const PokemonDetails: NextPage<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const { query, push } = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { name, description, image, base } = pokemon;

  return (
    <MotionBox
      p={4}
      initial="hidden"
      animate="enter"
      variants={{ hidden: { opacity: 0 }, enter: { opacity: 1 } }}
    >
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => {
          setButtonLoading(true);
          push({
            pathname: "/",
            query: {
              ...(query.name ? { name: query.name } : {}),
              ...(query.type ? { type: query.type } : {}),
            },
          });
        }}
        isLoading={buttonLoading}
      >
        Pokedex
      </Button>
      <Box mt={4}>
        <Image
          width={400}
          height={400}
          src={image.hires || ""}
          alt="Pokemon image"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${base64Shimmer(400, 400)}`}
        />
      </Box>
      <Text fontSize="5xl">{name.english}</Text>
      <Text fontSize="lg">{description}</Text>
      <StatGroup mt={8}>
        {Object.entries(base || {}).map(([key, value]) => (
          <Stat key={key}>
            <StatLabel>{key}</StatLabel>
            <StatNumber>{value}</StatNumber>
          </Stat>
        ))}
      </StatGroup>
    </MotionBox>
  );
};

export default PokemonDetails;
