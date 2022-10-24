## ERC721 Pokedex

This demonstrates how to turn a [Pokedex](https://github.com/Purukitto/pokemon-data.json) into an ERC721 NFT collection whose IFPS metadata conforms to [OpenSea](https://docs.opensea.io/docs/metadata-standards) standard, and then build a web app around it.

Deployed at https://pokemon-nft-web.vercel.app and [Polygon Mumbai](https://mumbai.polygonscan.com/address/0x22448d0D2a0685c713e568272de1aFc7F8BEE644).

The web app has a listing page to view the Pokemons, and a details page. The client does not need Metamask because it does not communicate with the `Pokemon` ERC721 contract directly. Instead the pages fetch the data from Next.js [API routes](https://nextjs.org/docs/api-routes/introduction).

The listing page [API route](https://pokemon-nft-web.vercel.app/api/list) gets its data from contract logs via Ethers [queryFilter](https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter) on a non-standard `Minted` event added to ERC721's `safeMint` function. The `Minted` event provides only the basic Pokemon fields of `tokenId`, `name`, `types`, and a thumbnail IPFS CID, just sufficient for the listing page to display and filter Pokemons.

The details page [API route](https://pokemon-nft-web.vercel.app/api/get/1) on the other hand gets full data for a single Pokemon via standard ERC721's `tokenURI` which returns IPFS CID for its metadata.

Both thumbnails (listing page) and high resolution images (details page) are stored on IPFS, with CIDs in contract logs for the former, and in Pokemon `image` metadata field for the latter.

The state for name & type filters at the root page is kept in url query params so that

- the filters are retained when returning from the details page
- the root page is server side rendered efficiently with Pokemon data filtered as per the url
- filter changes on the client trigger Next.js client-side page transitions which send a request to the server to update Pokemon data (see [when does getServerSideProps run](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-does-getserversideprops-run)). The requests are cached client side for an hour.

## Getting Started

- `yarn scripts:mint-feed` uploads images and metadata to IPFS, and turns `pokedex.json` into a `mint-feed.json` with the fields ready to be consumed by `yarn sol:deploy`
- `yarn sol:node` starts Hardhat Network
- `yarn sol:deploy` deploys Pokemon ERC721 contract and mints all the Pokemon NFTs using the `mint-feed.json`
- `yarn web:dev` starts the web app at [http://localhost:3000](http://localhost:3000) and API routes at [http://localhost:3000/api/list](http://localhost:3000/api/list) and [http://localhost:3000/api/get/1](http://localhost:3000/api/get/1).
