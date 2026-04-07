# Pokédex REPL

A command-line Pokédex application built with TypeScript that lets you explore the Pokémon world, catch Pokémon, and manage your collection through an interactive REPL interface. Built as part of my learning journey at [Boot.dev](https://www.boot.dev).

## Features

- Explore location areas in the Pokémon world
- Discover which Pokémon appear in different locations
- Catch Pokémon with realistic catch rates based on base experience
- Inspect caught Pokémon to view their stats, types, height, and weight
- View your complete Pokédex of caught Pokémon
- Built-in caching system for efficient API calls

## Installation

```bash
npm install
```

## Usage

Build and run the application:

```bash
npm run build
npm start
```

Or use the dev command for a quick build and run:

```bash
npm run dev
```

## Available Commands

Once the REPL starts, you can use the following commands:

- `help` - Display available commands and their descriptions
- `map` - Show the next 20 location areas in the Pokémon world
- `mapb` - Show the previous 20 location areas
- `explore <location-name>` - List all Pokémon found in a specific location
- `catch <pokemon-name>` - Attempt to catch a Pokémon (success depends on base experience)
- `inspect <pokemon-name>` - View detailed stats of a caught Pokémon
- `pokedex` - List all Pokémon you've caught
- `exit` - Exit the application

## Example Session

```
Pokedex > map
canalave-city-area
eterna-city-area
pastoria-city-area
...

Pokedex > explore canalave-city-area
Exploring canalave-city-area...
Found Pokemon(s):
tentacool
tentacruel
staryu
...

Pokedex > catch tentacool
Throwing a Pokeball at tentacool...
tentacool was caught!
You may now inspect it with the inspect command.

Pokedex > inspect tentacool
Name: tentacool
Height: 9
Weight: 455
Stats:
  - hp: 40
  - attack: 40
  - defense: 35
...
Types:
  - water
  - poison

Pokedex > pokedex
Your Pokedex:
  - tentacool

Pokedex > exit
```

## Implementation Details

- Built with TypeScript for type safety
- Uses the [PokéAPI](https://pokeapi.co/) for Pokémon data
- Implements a caching layer to reduce API calls (5-second cache duration)
- Zod for runtime type validation
- Vitest for testing

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run dev` - Build and run in one command
- `npm test` - Run the test suite

## Project Structure

```
src/
├── main.ts              # Application entry point
├── repl.ts              # REPL implementation
├── state.ts             # Application state management
├── pokeapi.ts           # PokéAPI client
├── pokecache.ts         # Caching implementation
├── command_*.ts         # Individual command implementations
```

## License

ISC
