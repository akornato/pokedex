import { useState } from "react";
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
import { host } from "../constants/host";
import { motion } from "framer-motion";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokemon } from "../types/Pokemon";

const MotionBox = motion(
  forwardRef((props, ref) => <Box {...props} ref={ref} />)
);
MotionBox.displayName = "MotionBox";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(`${host}/api/get/${query.id}`);
  const pokemon = await res.json();
  return {
    props: { pokemon },
  };
};

const PokemonDetails: NextPage<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const { push } = useRouter();
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
          push("/");
        }}
        isLoading={buttonLoading}
      >
        Pokadex
      </Button>
      <Box mt={4}>
        <img src={image.hires} alt="Pokemon image" />
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
