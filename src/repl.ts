import { createInterface } from "node:readline";
import type { CLICommand } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function getCommands(): Record<string, CLICommand> {
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
        // more commands go here
    };
}

export function startRepl() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    
    // display prompt
    rl.prompt();

    // listening on line
    rl.on("line", (input) => {
        if (!input) {
            rl.prompt();
        } else {
            const inputArr = cleanInput(input);
            const userCmd = inputArr[0];
            const supportedCmds = getCommands();
            if (supportedCmds[userCmd]) {
                try {
                    supportedCmds[userCmd].callback(supportedCmds);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Unknown command");
            }
        }

        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    const cleanInput = input.trim().toLowerCase();
    const inputArr = cleanInput.split(" ");
    return inputArr.filter((entry) => entry !== "");
}