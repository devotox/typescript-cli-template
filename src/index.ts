/**
 * TypeScript CLI template using Commander.js for a better command-line interface.
 * This template demonstrates how to create a modern CLI application with TypeScript.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';
import parseJson from 'parse-json';

// Get the version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = parseJson(packageJsonContent) as { version: string };
const { version } = packageJson;

/**
 * Example function that can be exported from this module.
 */
export function exampleFunction(input: string): string {
  return `Hello, ${input}!`;
}

/**
 * Configure and set up the Commander program
 */
export function createProgram(): Command {
  const program = new Command();

  program
    .name('cli-app')
    .description('A CLI application built with TypeScript and Commander.js')
    .version(version)
    // Use the non-deprecated way of adding help command
    .helpCommand('help [command]', 'Display help for command')
    .helpOption('-h, --help', 'Display help information');

  // Basic command example
  program
    .command('greet')
    .description('Greet a person by name')
    .argument('<name>', 'Name of the person to greet')
    .option('-u, --uppercase', 'Output the greeting in uppercase')
    .action((name: string, options: { uppercase?: boolean }) => {
      let greeting = exampleFunction(name);

      if (options.uppercase === true) {
        greeting = greeting.toUpperCase();
      }

      console.log(greeting);
    });

  // Another command example
  program
    .command('echo')
    .description('Echo back the provided text')
    .argument('<text...>', 'Text to echo back')
    .action((text: string[]) => {
      console.log(text.join(' '));
    });

  return program;
}

/**
 * Main function that will be called when running the CLI.
 */
export function main(): void {
  try {
    const program = createProgram();
    program.parse();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

// Check if this is the main module
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

// Run the CLI if this file is executed directly
if (isMainModule) {
  main();
}
