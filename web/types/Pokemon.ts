export type Pokedex = {
  tokenId: string;
  name: string;
  types: string;
  cidThumbnail: string;
}[];

export type Pokemon = {
  name: string;
  image: string;
  description: string;
  attributes: [
    {
      trait_type: "Types";
      value: string;
    },
    {
      trait_type: "HP";
      value: number;
    },
    {
      trait_type: "Attack";
      value: number;
    },
    {
      trait_type: "Defense";
      value: number;
    },
    {
      trait_type: "Sp. Attack";
      value: number;
    },
    {
      trait_type: "Sp. Defense";
      value: number;
    },
    {
      trait_type: "Speed";
      value: number;
    }
  ];
};
