import { startRepl } from "./repl.js";
import { initState } from "./state.js";

async function main(): Promise<void> {
  const state = await initState();
  await startRepl(state);
}

main();
