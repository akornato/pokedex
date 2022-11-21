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
    process.env.NODE_ENV === "development" ? chains.hardhat.id : -1,
  ].includes(chain?.id || 0);

  if (connectedAddress && !isNetworkAllowed) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>
          Switch to Polygon Mumbai in Metamask
        </AlertDescription>
      </Alert>
    );
  }
  return <>{children}</>;
};
