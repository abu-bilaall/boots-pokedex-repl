import { State } from "./state.js";

export async function pokedex(state: State) {
  if (state.pokedex.length === 0) {
    console.log("You've not caught any pokemon");
    return;
  }

  const caughtPokemons = state.pokedex.map((pokemon) => `- ${pokemon.name}`);
  console.log(`
Your Pokedex:
\t${caughtPokemons.join("\n\t")}`);
}
