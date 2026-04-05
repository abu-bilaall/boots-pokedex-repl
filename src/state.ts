import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { map, mapb } from "./command_map.js";
import { explore } from "./command_explore.js";
import { catchCmd } from "./command_catch.js";

type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, location?: string) => Promise<void>;
};

function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the names of 20 location areas in the Pokemon world",
            callback: map,
        },
        mapb: {
            name: "mapb",
            description: "Similar to the map command but it displays the previous 20 locations",
            callback: mapb,
        },
        explore: {
            name: "explore",
            description: "Finds all pokemons within the specified location",
            callback: explore,
        },
        catch: {
            name: "catch",
            description: "Might catch a pokemon and adds it to the user's pokedex",
            callback: catchCmd,
        }
        // more commands go here
    };
}

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
    pokedex: string[],
}

export async function initState(): Promise<State> {
    const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        });
    const commands = getCommands();
    const pokeapi = new PokeAPI();
    const nextLocationsURL = null;
    const prevLocationsURL = null;
    const pokedex: string[] = [];

    return { rl, commands, pokeapi, nextLocationsURL, prevLocationsURL, pokedex };
}