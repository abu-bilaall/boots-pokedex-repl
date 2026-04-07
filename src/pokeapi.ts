import { z } from "zod";
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

type pokemonInfoType = {
  base_exp: EndpointResponse["base_experience"];
  name: EndpointResponse["forms"][number]["name"];
  height: EndpointResponse["height"];
  weight: EndpointResponse["weight"];
  stats: EndpointResponse["stats"];
  types: EndpointResponse["types"];
};

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

  async fetchPokemonInfo(pokemonName: string) {
    const urlEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const res = await fetch(urlEndpoint);

    if (!res.ok) {
      console.log(`${pokemonName} not found!`);
    }

    const json = await res.json();
    const resObj: EndpointResponse = EndpointResponseSchema.parse(json);

    const pokemonInfo: pokemonInfoType = {
      base_exp: resObj.base_experience,
      name: resObj.forms[0].name,
      height: resObj.height,
      weight: resObj.weight,
      stats: resObj.stats,
      types: resObj.types,
    };

    return pokemonInfo;
  }
}

export {
  ShallowLocations,
  Location,
  PokemonEncounter,
  PokeAPI,
  pokemonInfoType,
};
