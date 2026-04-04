import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    const cmdDescriptions: string[] = [];
    for (const cmd in commands) {
        cmdDescriptions.push(`${commands[cmd].name}: ${commands[cmd].description}`);
    }

    console.log(`
Welcome to the Pokedex!
Usage:

${cmdDescriptions.join("\n")}\n`);
}