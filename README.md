# TypeScript CLI Template

A template for building command-line interface (CLI) applications with TypeScript.

## Features

- TypeScript for type safety
- Comprehensive testing setup with Vitest
- Linting with ESLint, Biome, and Oxlint
- Build system with tsup
- Zod for runtime validation
- Proper error handling and exit codes

## Project Structure

```
.
├── bin/            # CLI executable scripts
├── src/            # Source code
├── test/           # Test files
├── dist/           # Compiled output (generated)
├── tsconfig.json   # TypeScript configuration
└── package.json    # Project dependencies and scripts
```

## Getting Started

1. Clone this template
2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build
```

4. Make the CLI executable:

```bash
chmod +x bin/cli-app
```

## Development

### Running the Application

```bash
pnpm start
```

Or directly:

```bash
./bin/cli-app [arguments]
```

### Running Tests

```bash
pnpm test
```

### Running Tests in Watch Mode

```bash
pnpm test:watch
```

### Checking Code Coverage

```bash
pnpm test:coverage
```

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm typecheck
```

## Customization

1. Update `package.json` with your project details
2. Modify `src/index.ts` with your implementation
3. Update the CLI script in `bin/` if needed
4. Add tests in the `test/` directory

## License

ISC
