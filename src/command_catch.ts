import { State } from "./state.js";
import { pokemonInfoType } from "./pokeapi.js";

export async function catchCmd(state: State, ...args: string[]) {
  const pokemonName = args.length > 0 ? args[0] : undefined;

  if (pokemonName === undefined) {
    console.log("You must specify a pokemon name");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemonInfo: pokemonInfoType =
    await state.pokeapi.fetchPokemonInfo(pokemonName);

  const MIN_CATCH_RATE = 0.05;
  const MAX_CATCH_RATE = 0.95;

  const catchRate = Math.max(
    MIN_CATCH_RATE,
    Math.min(MAX_CATCH_RATE, 1 - pokemonInfo.base_exp / 600),
  );

  if (Math.random() < catchRate) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex.push(pokemonInfo);
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
