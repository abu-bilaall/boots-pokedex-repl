import { State } from "./state.js";

export async function inspect(state: State, ...args: string[]) {
  const pokemonName = args.length > 0 ? args[0] : undefined;

  if (pokemonName === undefined) {
    console.log("You must specify a pokemon name");
    return;
  }

  for (const entry of state.pokedex) {
    if (entry.name === pokemonName) {
      const statsOutput = entry.stats.map(
        (stat) => `-${stat.stat.name}: ${stat.base_stat}`,
      );
      const typesOutput = entry.types.map((type) => `-${type.type.name}`);
      console.log(`
Name: ${entry.name}
Height: ${entry.height}
Weight: ${entry.weight}
Stats:
\t${statsOutput.join("\n\t")}
Types:
\t${typesOutput.join("\n\t")}`);
      return;
    }
  }

  console.log("You have not caught that pokemon");
}
