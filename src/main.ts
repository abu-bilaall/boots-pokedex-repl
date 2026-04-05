import { startRepl } from "./repl.js";
import { initState } from "./state.js";

async function main(): Promise<void> {
  const stateObj = await initState();
  await startRepl(stateObj);
}

main();
