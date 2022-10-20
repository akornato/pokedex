/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pokemon-nft.infura-ipfs.io"],
  },
};

module.exports = nextConfig;
