import { State } from "./state.js";

export async function catchCmd(state: State, pokemonName?: string) {
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const urlEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const res = await fetch(urlEndpoint);
  const { base_exp } = await res.json();
  const maxExp = 300;
  const catchRate = 1 - base_exp / maxExp;

  if (Math.random() < catchRate) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex.push(pokemonName!);
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
