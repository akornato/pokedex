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
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { base64Shimmer } from "web/shared/shimmer";
import { pokemonContract, marketplaceContract } from "web/shared/contract";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokemon } from "web/types/Pokemon";

const MotionBox = motion(
  forwardRef((props, ref) => <Box {...props} ref={ref} />)
);
MotionBox.displayName = "MotionBox";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const tokenId = parseInt(query.id?.toString() || "");
  const [pokemon, listing] = await Promise.all([
    pokemonContract
      .tokenURI(tokenId)
      .then((cid) =>
        fetch(`https://pokemon-nft.infura-ipfs.io/ipfs/${cid}`).then((res) =>
          res.json()
        )
      ),
    marketplaceContract
      .getListing(pokemonContract.address, tokenId)
      .catch(() => {}),
  ]);
  return {
    props: {
      pokemon,
      ...(listing
        ? {
            listing: {
              price: listing[0].toString(),
              seller: listing[1],
            },
          }
        : {}),
    },
  };
};

const PokemonDetails: NextPage<{
  pokemon: Pokemon;
  listing?: { price: string; seller: string };
}> = ({ pokemon, listing }) => {
  const { query, push } = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { name, description, image, attributes } = pokemon;

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
          src={`https://pokemon-nft.infura-ipfs.io/ipfs/${image}`}
          alt="Pokemon image"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${base64Shimmer(400, 400)}`}
        />
      </Box>
      <Text fontSize="5xl">{name}</Text>
      {listing && (
        <Stat mt={4}>
          <StatLabel>Listed price</StatLabel>
          <StatNumber>
            {ethers.utils.formatEther(listing.price).toString()} MATIC
          </StatNumber>
        </Stat>
      )}
      <Text mt={4} fontSize="lg">
        {description}
      </Text>
      <StatGroup mt={8}>
        {attributes.map(({ trait_type, value }) => (
          <Stat key={trait_type}>
            <StatLabel>{trait_type}</StatLabel>
            <StatNumber>{value}</StatNumber>
          </Stat>
        ))}
      </StatGroup>
    </MotionBox>
  );
};

export default PokemonDetails;
