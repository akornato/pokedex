import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../shared/theme";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.hardhat],
  [publicProvider()]
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
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
