The Pokedex app has a root page to view the Pokemons, and a details page.

The state for name & type filters at the root page is kept in url query params so that

- the filters are retained when returning from the details page
- the root page is server side rendered efficiently with Pokemon data filtered as per the url
- filter changes on the client trigger Next.js client-side page transitions which automatically send an API request to the server to update Pokemon data (see [when does getServerSideProps run](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-does-getserversideprops-run))

Deployed at https://pokedex-three-pink.vercel.app

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/list](http://localhost:3000/api/list) and [http://localhost:3000/api/get/1](http://localhost:3000/api/get/1).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
