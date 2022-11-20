## ERC721/ERC2981 Pokedex royalty marketplace

[Pokedex](https://github.com/Purukitto/pokemon-data.json) is turned into an ERC721 NFT collection extended with ERC2981 NFT Royalty Standard and metadata on IFPS, then listed on a Marketplace which implements royalty transfers on the NFT trades.

Deployed at https://pokemon-nft-web.vercel.app and [Polygon Mumbai](https://mumbai.polygonscan.com/address/0x22448d0D2a0685c713e568272de1aFc7F8BEE644).

The web app has a listing page to view all available Pokemons (both listed or not), and a details page, which allows to list or buy the Pokemons on the Marketplace.

On SSR the listing page gets (and caches) limited Pokemon data from contract logs of a non-standard `Minted` event. The event provides only the basic info of token id, name, types, and a thumbnail url, just sufficient for the listing page to display and filter Pokemons by name and type.

On SSR the details page gets (and caches) full Pokemon data such as full description, high res image url and remaining attributes via ERC721 `tokenURI` which returns IPFS CID for its metadata. On the client the page additionally gets the current NFT owner and the listing on the Marketplace, if any, and keeps their status up to date on new blocks.

Both thumbnails and high res images are stored on IPFS, with CIDs in contract logs for the former, and in Pokemon `image` metadata field for the latter.

The state for name & type filters at the root page is kept in url query params so that

- the filters are retained when returning from the details page
- the root page is server side rendered efficiently with Pokemon data filtered as per the url
- filter changes on the client trigger Next.js client-side page transitions which send a request to the server to update Pokemon data (see [when does getServerSideProps run](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-does-getserversideprops-run))

## Getting Started

- `yarn scripts:mint-feed` uploads images and metadata to IPFS, and turns `pokedex.json` into a `mint-feed.json` with the fields ready to be consumed by `yarn sol:deploy`
- `yarn sol:node` starts Hardhat Network
- `yarn sol:deploy` deploys Pokemon and Marketplace contracts, mints all the Pokemon NFTs from `mint-feed.json`, and lists them on the marketplace
- `yarn web:dev` starts the web app at [http://localhost:3000](http://localhost:3000) and API routes at [http://localhost:3000/api/list](http://localhost:3000/api/list) and [http://localhost:3000/api/get/1](http://localhost:3000/api/get/1).
