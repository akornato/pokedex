import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../shared/theme";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { NetworkGuard } from "web/components/NetworkGuard";
import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string }),
    publicProvider(),
  ]
);

const client = createClient({
  connectors: [new MetaMaskConnector({ chains })],
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <WagmiConfig client={client}>
          <NetworkGuard>
            <Component {...pageProps} />
          </NetworkGuard>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
