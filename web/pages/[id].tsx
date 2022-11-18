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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { base64Shimmer } from "web/shared/shimmer";
import { useMarketplace } from "web/hooks/useMarketplace";
import { usePokemon } from "web/hooks/usePokemon";
import { ConnectButton } from "web/components/ConnectButton";
import type { NextPage } from "next";

const MotionBox = motion(
  forwardRef((props, ref) => <Box {...props} ref={ref} />)
);
MotionBox.displayName = "MotionBox";

const PokemonDetails: NextPage = () => {
  const { query, push } = useRouter();
  const tokenId = ethers.BigNumber.from(query?.id?.toString() || 0);
  const { address: connectedAddress } = useAccount();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { pokemon, owner } = usePokemon(tokenId);
  const { name, description, image, attributes } = pokemon || {};
  const {
    isListingActive,
    listing,
    buy,
    cancelListing,
    approve,
    isApproved,
    listItem,
  } = useMarketplace(tokenId, owner);

  return (
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
        <Spacer />
        <ConnectButton />
      </Stack>
      <Box mt={4}>
        {image && (
          <Image
            width={400}
            height={400}
            src={`https://pokemon-nft.infura-ipfs.io/ipfs/${image}`}
            alt="Pokemon image"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${base64Shimmer(400, 400)}`}
          />
        )}
      </Box>
      <Text fontSize="5xl">{name}</Text>

      <StatGroup mt={4}>
        {isListingActive && listing && (
          <>
            <Stat>
              <StatLabel>Listed price</StatLabel>
              <StatNumber>
                {ethers.utils.formatEther(listing.price).toString()} MATIC
                {connectedAddress && connectedAddress !== owner && (
                  <Button
                    ml={4}
                    mb={2}
                    position="absolute"
                    onClick={() => buy?.()}
                  >
                    Buy item
                  </Button>
                )}
                {connectedAddress && connectedAddress === owner && (
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
        <Stat>
          <StatLabel>Owner</StatLabel>
          <StatNumber>
            {owner?.substring(0, 5)}...
            {owner?.substring(owner.length - 4)}
          </StatNumber>
        </Stat>
      </StatGroup>

      {!isListingActive &&
        connectedAddress &&
        owner &&
        connectedAddress === owner &&
        (!isApproved ? (
          <Button mt={2} onClick={async () => approve?.()}>
            Approve
          </Button>
        ) : (
          <Button mt={2} onClick={async () => listItem?.()}>
            List item
          </Button>
        ))}
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
    </MotionBox>
  );
};

export default PokemonDetails;
