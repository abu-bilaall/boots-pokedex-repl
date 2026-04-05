import { State } from "./state.js";
import { type PokemonEncounter } from "./pokeapi.js";

export async function explore(state: State, location?: string ) {
    const pokemonEncounters: PokemonEncounter[] = (await state.pokeapi.fetchLocation(location)).pokemon_encounters;
    console.log(`Exploring ${location}...\nFound Pokemon(s):`);
    pokemonEncounters.map((encounter) => console.log(encounter.pokemon.name));
}