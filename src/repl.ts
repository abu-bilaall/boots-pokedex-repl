import { State } from "./state.js";

export async function startRepl(stateObj: State) {
  const rl = stateObj.rl;
  const commands = stateObj.commands;

  // display prompt
  rl.prompt();

  // listening on line
  rl.on("line", async (input) => {
    if (!input) {
      rl.prompt();
    } else {
      const inputArr = cleanInput(input);
      const userCmd = inputArr[0];
      const location = inputArr[1] ? inputArr[1] : undefined;
      if (commands[userCmd]) {
        try {
          if (location) {
            await commands[userCmd].callback(stateObj, location);
          } else {
            await commands[userCmd].callback(stateObj);
          }
          console.log();
        } catch (error) {
          console.log((error as Error).message);
        }
      } else {
        console.log("Unknown command\n");
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
