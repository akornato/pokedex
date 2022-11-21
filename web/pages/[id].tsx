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
  Stack,
  Spacer,
  Progress,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";
import { chain as chains } from "wagmi";
import { motion } from "framer-motion";
import { base64Shimmer } from "web/shared/shimmer";
import { useMarketplace } from "web/hooks/useMarketplace";
import { ConnectButton } from "web/components/ConnectButton";
import { getAddresses } from "web/shared/addresses";
import { abi as pokemonAbi } from "sol/artifacts/contracts/Pokemon.sol/Pokemon.json";
import type { NextPage, GetServerSideProps } from "next";
import type { Pokemon as PokemonContract } from "sol/typechain-types";
import type { Pokemon } from "web/types/Pokemon";

const MotionBox = motion(
  forwardRef((props, ref) => <Box {...props} ref={ref} />)
);
MotionBox.displayName = "MotionBox";

const pokemonCache: { [chainIdTokenId: string]: Pokemon } = {};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const chainId =
    parseInt(query?.chainId?.toString() || "0") || chains.polygonMumbai.id;
  const pokemonId = parseInt(query?.id?.toString() || "0");
  const cacheKey = `${chainId}:${pokemonId}`;
  if (!pokemonCache[cacheKey]) {
    const { pokemonAddress } = getAddresses(chainId);
    const pokemonContract = new ethers.Contract(
      pokemonAddress,
      pokemonAbi,
      new ethers.providers.JsonRpcProvider(
        chainId === chains.hardhat.id
          ? "http://127.0.0.1:8545"
          : `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
      )
    ) as PokemonContract;
    pokemonCache[cacheKey] = await pokemonContract
      .tokenURI(parseInt(query?.id?.toString() || "0"))
      .then((cid) =>
        fetch(`https://pokemon-nft.infura-ipfs.io/ipfs/${cid}`).then((res) =>
          res.json()
        )
      );
  }
  return {
    props: {
      pokemon: pokemonCache[cacheKey],
    },
  };
};

const PokemonDetails: NextPage<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  const { query, push } = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const tokenId = ethers.BigNumber.from(query?.id?.toString() || 0);
  const { name, description, image, attributes } = pokemon || {};
  const { owner, listing, buy, cancelListing, approve, listItem } =
    useMarketplace(tokenId);

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
      <MotionBox
        p={4}
        initial="hidden"
        animate="enter"
        variants={{ hidden: { opacity: 0 }, enter: { opacity: 1 } }}
      >
        <Stack direction="row">
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={() => {
              setShowProgress(true);
              push({
                pathname: "/",
                query: {
                  ...(query.name ? { name: query.name } : {}),
                  ...(query.type ? { type: query.type } : {}),
                },
              });
            }}
          >
            Pokedex
          </Button>
          <Spacer />
          <ConnectButton />
        </Stack>
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

        <Text mt={4} fontSize="lg">
          {description}
        </Text>
        <StatGroup mt={8}>
          {attributes?.map(({ trait_type, value }) => (
            <Stat key={trait_type}>
              <StatLabel>{trait_type}</StatLabel>
              <StatNumber>{value}</StatNumber>
            </Stat>
          ))}
        </StatGroup>

        <StatGroup mt={4}>
          {listing && (
            <>
              <Stat>
                <StatLabel>Owner</StatLabel>
                <StatNumber>
                  {owner?.substring(0, 5)}...
                  {owner?.substring(owner.length - 4)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Listed price</StatLabel>
                <StatNumber>
                  {ethers.utils.formatEther(listing.price).toString()} MATIC
                  {buy && (
                    <Button
                      ml={4}
                      mb={2}
                      position="absolute"
                      onClick={() => buy?.()}
                    >
                      Buy item
                    </Button>
                  )}
                  {cancelListing && (
                    <Button
                      ml={4}
                      mb={2}
                      position="absolute"
                      onClick={() => cancelListing?.()}
                    >
                      Cancel listing
                    </Button>
                  )}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Seller</StatLabel>
                <StatNumber>
                  {listing.seller.substring(0, 5)}...
                  {listing.seller.substring(listing.seller.length - 4)}
                </StatNumber>
              </Stat>
            </>
          )}
        </StatGroup>
        {approve && (
          <Button mt={2} onClick={async () => approve?.()}>
            Approve
          </Button>
        )}
        {listItem && (
          <Button mt={2} onClick={async () => listItem?.()}>
            List item
          </Button>
        )}
      </MotionBox>
    </>
  );
};

export default PokemonDetails;
