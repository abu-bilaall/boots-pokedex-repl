import { State } from "./state.js";

export async function startRepl(state: State) {
  // display prompt
  state.rl.prompt();

  // listening on line
  state.rl.on("line", async (input) => {
    if (!input) {
      state.rl.prompt();
    } else {
      const inputArgs = cleanInput(input);
      const userCmd = inputArgs.keyArg;
      const otherArgs = inputArgs.otherArgs;
      if (state.commands[userCmd]) {
        try {
          await state.commands[userCmd].callback(state, ...otherArgs);
          console.log();
        } catch (error) {
          console.log((error as Error).message);
        }
      } else {
        console.log("Unknown command\n");
      }
    }

    state.rl.prompt();
  });
}

export function cleanInput(input: string) {
  const cleanedInput = input.trim().toLowerCase();
  const inputArr = cleanedInput.split(" ");
  const [keyArg, ...otherArgs] = inputArr.filter((entry) => entry !== "");
  return { keyArg, otherArgs };
}
