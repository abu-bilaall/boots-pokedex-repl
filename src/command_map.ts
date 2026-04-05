import { State } from "./state.js";
import { PokeAPI, type ShallowLocations } from "./pokeapi.js";

export async function map(state: State) {
    let shallowLocations: ShallowLocations;
    if (state.nextLocationsURL === null) {
        shallowLocations = await state.pokeapi.fetchLocations();
    } else {
        shallowLocations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    }

    state.nextLocationsURL = shallowLocations.next;
    state.prevLocationsURL = shallowLocations.previous;
    shallowLocations.results.map((location) => console.log(location.name));
}

export async function mapb(state: State) {
    if (state.prevLocationsURL === null) {
        console.log("You're on the first page");
        return;
    }

    const shallowLocations = await state.pokeapi.fetchLocations(state.prevLocationsURL!);
    state.nextLocationsURL = shallowLocations.next;
    state.prevLocationsURL = shallowLocations.previous;

  shallowLocations.results.map((location) => console.log(location.name));
}