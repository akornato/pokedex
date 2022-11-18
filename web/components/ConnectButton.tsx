import { useEffect } from "react";
import { useRouter } from "next/router";
import { omitBy } from "lodash";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  chain as chains,
} from "wagmi";
import { Button } from "@chakra-ui/react";

export const ConnectButton = () => {
  const { query, push } = useRouter();
  const { chain } = useNetwork();
  const { address: connectedAddress, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    push({
      query: omitBy(
        {
          ...query,
          chainId:
            chain?.id === chains.hardhat.id ? chains.hardhat.id : undefined,
        },
        (value) => !value
      ),
    });
    // eslint-disable-next-line
  }, [chain]);

  return (
    <Button
      ml={4}
      onClick={() =>
        isConnected ? disconnect() : connect({ connector: connectors[0] })
      }
    >
      {isConnected
        ? `${connectedAddress?.substring(0, 5)}...${connectedAddress?.substring(
            connectedAddress.length - 4
          )}`
        : "Connect"}
    </Button>
  );
};
