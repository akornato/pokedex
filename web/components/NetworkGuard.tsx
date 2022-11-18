import React from "react";
import { chain as chains, useAccount, useNetwork } from "wagmi";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export const NetworkGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { chain } = useNetwork();
  const { address: connectedAddress } = useAccount();
  const isNetworkAllowed = [
    chains.polygonMumbai.id,
    chains.hardhat.id,
  ].includes(chain?.id || 0);

  if (connectedAddress && !isNetworkAllowed) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>
          Switch to either Polygon Mumbai or Hardhat network in Metamask
        </AlertDescription>
      </Alert>
    );
  }
  return <>{children}</>;
};
