import fs from "fs-extra";

async function main() {
  const fileMarketplace = fs.readFileSync(
    "typechain-types/factories/contracts/Marketplace__factory.ts"
  );
  const abiMarketplace =
    fileMarketplace.toString().match(/const _abi.*?;/s)?.[0] || "";
  fs.outputFileSync(
    "../web/shared/Marketplace.abi.const.ts",
    abiMarketplace
      .replace("const _abi", "export const abi")
      .replace(";", " as const;")
  );

  const filePokemon = fs.readFileSync(
    "typechain-types/factories/contracts/Pokemon__factory.ts"
  );
  const abiPokemon = filePokemon.toString().match(/const _abi.*?;/s)?.[0] || "";
  fs.outputFileSync(
    "../web/shared/Pokemon.abi.const.ts",
    abiPokemon
      .replace("const _abi", "export const abi")
      .replace(";", " as const;")
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
