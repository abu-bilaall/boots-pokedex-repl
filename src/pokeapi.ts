import { Cache } from "./pokecache.js";

type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LocationData[];
};

type LocationData = {
  name: string;
  url: string;
};

type Location = {
  pokemon_encounters: PokemonEncounter[];
};

interface PokemonEncounter {
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  url: string;
}

class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  static #pokecache: Cache;

  //   constructor() {}
  constructor() {
    PokeAPI.#pokecache = new Cache(5000); // 5  seconds
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullUrl = `${PokeAPI.baseURL}/location-area/`;
    if (pageURL) fullUrl = pageURL;

    const cachedVal = PokeAPI.#pokecache.get(fullUrl);
    if (cachedVal !== undefined) {
      return cachedVal.val;
    }

    const res = await fetch(fullUrl);
    const resObj = res.json();
    PokeAPI.#pokecache.add(fullUrl, resObj);
    return resObj;
  }

  async fetchLocation(locationName?: string): Promise<Location> {
    let fullUrl = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cachedVal = PokeAPI.#pokecache.get(fullUrl);
    if (cachedVal !== undefined) {
      return cachedVal.val;
    }

    const res = await fetch(fullUrl);
    const resObj = res.json();
    PokeAPI.#pokecache.add(fullUrl, resObj);
    return resObj;
  }
}

export { ShallowLocations, Location, PokemonEncounter, PokeAPI };
