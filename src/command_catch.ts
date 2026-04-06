import { State } from "./state.js";
import { z } from "zod";

const EndpointResponseSchema = z.object({
  base_experience: z.number(),
  forms: z.array(z.object({ name: z.string(), url: z.string() })),
  height: z.number(),
  weight: z.number(),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({ name: z.string(), url: z.string() }),
    }),
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({ name: z.string(), url: z.string() }),
    }),
  ),
});

type EndpointResponse = z.infer<typeof EndpointResponseSchema>;

export type pokemonInfoType = {
  base_exp: EndpointResponse["base_experience"];
  name: EndpointResponse["forms"][number]["name"];
  height: EndpointResponse["height"];
  weight: EndpointResponse["weight"];
  stats: EndpointResponse["stats"];
  types: EndpointResponse["types"];
};

export async function catchCmd(state: State, pokemonName?: string) {
  if (pokemonName === undefined) {
    console.log("You must specify a pokemon name");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const urlEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const res = await fetch(urlEndpoint);

  if (!res.ok) {
    console.log(`${pokemonName} not found!`);
  }

  const json = await res.json();
  const resObj: EndpointResponse = EndpointResponseSchema.parse(json);

  const pokemonInfo = {
    base_exp: resObj.base_experience,
    name: resObj.forms[0].name,
    height: resObj.height,
    weight: resObj.weight,
    stats: resObj.stats,
    types: resObj.types,
  };

  const maxExp = 300;
  const catchRate = 1 - pokemonInfo.base_exp / maxExp;

  if (Math.random() < catchRate) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex.push(pokemonInfo);
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
