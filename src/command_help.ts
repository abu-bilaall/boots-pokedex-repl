import { State } from "./state.js";

export async function commandHelp(state: State) {
    const cmdDescriptions: string[] = [];
    for (const cmd in state.commands) {
        cmdDescriptions.push(`${state.commands[cmd].name}: ${state.commands[cmd].description}`);
    }

    console.log(`
Welcome to the Pokedex!
Usage:

${cmdDescriptions.join("\n")}`);
}