# TypeScript Template Development Guide

> Created and maintained by Devonte — My personal collection of TypeScript best practices and patterns I've refined through years of production development.

This document provides instructions for working with this TypeScript template repository. This template is set up with modern tooling for TypeScript development, focusing on best practices and developer experience.

## Overview

This template is designed for TypeScript projects with the following characteristics:

- **Package Manager**: pnpm for fast, disk-efficient package management
- **Runtime**: Node.js v20+
- **Language**: TypeScript with strict type checking
- **Module System**: ESM (ECMAScript Modules)
- **Testing**: Vitest for fast, ESM-compatible testing
- **Building**: tsup for optimized TypeScript builds
- **Path Aliases**: Configured for clean imports via `@/*`
- **Linting**: Multi-layered approach with oxlint, Biome, and ESLint

## Requirements

- Node.js (v20 or later)
- pnpm (v10 or later)
- TypeScript (v5.7+)

## Getting Started

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
pnpm install
```

## Guidelines for LLMs and Developers

This section provides essential guidelines for both AI assistants (LLMs) and human developers working with this codebase.

### Code Style and Linting

Always adhere to the following code style rules:

1. **Use single quotes** for strings (not double quotes)
2. **Use path aliases** (`@/*`) for imports from the src directory
3. **Run linting** after making any code changes

```bash
# Lint the entire project
pnpm lint

# Lint a specific file (recommended when making targeted changes)
pnpm lint:eslint -- src/index.ts
pnpm lint:biome -- check --apply src/index.ts
```

### Path Alias Usage

Always use path aliases for imports from within the src directory:

```typescript
// CORRECT ✅
import { something } from '@/utils/something';

// INCORRECT ❌
import { something } from '../utils/something';
import { something } from '../../utils/something';
```

All path aliases are configured to point to the src directory, so the pattern is always `@/[path-within-src]`.

### Testing Guidelines

1. Always write tests for new functionality
2. Tests should be placed in the `test` directory
3. Use the testing helpers in `src/index.ts` for accessing private state when needed
4. Run tests after making changes:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode during development
pnpm test:watch
```

### After Making Changes

Always follow this checklist after making changes:

1. **Type check** your code: `pnpm typecheck`
2. **Lint** your code: `pnpm lint`
3. **Test** your code: `pnpm test`
4. **Build** your code: `pnpm build`

### Common Pitfalls to Avoid

1. **Mixing import styles**: Stick to path aliases for all internal imports
2. **Using Node.js directly**: Always use `pnpm tsx` for running TypeScript files
3. **Forgotten tests**: Ensure all new functionality has test coverage
4. **Hardcoded values**: Use environment variables or configuration files for dynamic values
5. **Inconsistent error handling**: Follow the established error handling patterns in the codebase

### For LLMs Specifically

When suggesting code changes for projects using this template:

1. Always strictly adhere to the established patterns in this template:
   - Use single quotes for strings
   - Use path aliases (`@/`) for imports from the src directory
   - Follow the existing error handling patterns
   - Maintain the code structure and style conventions

2. Do not attempt to reinvent conventions or introduce patterns that deviate from the template structure.

3. For each code change suggested, always run these validation commands:
   ```
   pnpm typecheck    # Type check your changes
   pnpm lint         # Run linting to ensure code quality
   ```

4. If a lint or typecheck error occurs, fix it immediately rather than leaving it for the developer.

5. If suggesting multi-file changes, list the files in a logical order of implementation

## Development Workflow

### Running TypeScript Files

This template uses `tsx` to directly execute TypeScript files without a separate compilation step during development:

```bash
# Run the development server with the main index.ts file
pnpm dev

# Run the production build (after building)
pnpm start

# Run any other TypeScript file
pnpm tsx path/to/file.ts
```

**IMPORTANT:** Always use pnpm as the package manager and tsx to run TypeScript files in development. Never use npm or node directly, as this can lead to module resolution issues and inconsistent behavior across environments.

```bash
# CORRECT
pnpm tsx src/index.ts

# INCORRECT
npm run start
node src/index.ts
```

### Type Checking

```bash
pnpm typecheck
```

This runs the TypeScript compiler in type-checking mode without emitting compiled code.

### Linting and Formatting

The template uses a multi-layered approach to code quality:

```bash
# Run all linters
pnpm lint

# Run specific linters
pnpm lint:oxlint
pnpm lint:biome
pnpm lint:eslint

# Format code
pnpm format
```

### Testing

Tests use Vitest, a Vite-based test runner compatible with ESM:

```bash
# Run tests once
pnpm test

# Watch mode for development
pnpm test:watch

# With coverage
pnpm test:coverage
```

### Building for Production

The template uses tsup (based on esbuild) for optimized builds:

```bash
# Standard build with type declarations
pnpm build

# Build without type declarations
pnpm build:no-dts
```

These commands build the project according to the configuration in the respective scripts in package.json, using the optimized settings in tsconfig.build.json.

## Project Structure

```
/
├── src/              # Source code
├── test/             # Test files
├── bin/              # Executable files or scripts
├── dist/             # Compiled output (generated)
├── tsconfig.json     # TypeScript configuration
├── tsconfig.build.json # TypeScript build configuration
├── vitest.config.ts  # Vitest configuration
├── eslint.config.mjs # ESLint configuration
├── biome.json        # Biome configuration
├── oxlintrc.json     # oxlint configuration
└── package.json      # Project metadata and scripts
```

## TypeScript Configuration

### Path Aliases

The template is configured with path aliases for cleaner imports:

```typescript
// Instead of
import { something } from '../../../utils/something';

// You can use
import { something } from '@/utils/something';
```

This is configured in `tsconfig.json` under the `paths` option.

### Module Resolution

The template uses the Bundler module resolution strategy for ESM compatibility:

```json
"module": "ESNext",
"moduleResolution": "Bundler",
```

### Strict Type Checking

The template enables comprehensive type checking for maximum safety:

```json
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"noUncheckedIndexedAccess": true,
```

## Build System

The template uses tsup for building, which provides:

- Fast builds with esbuild
- Output in multiple formats (CommonJS and ESM)
- Automatic generation of TypeScript declaration files
- Tree-shaking and code optimization

The build configuration is in the `build` script in `package.json`:

```json
"build": "tsup src/index.ts --format cjs,esm --dts --tsconfig tsconfig.build.json"
```

## Testing

The template uses Vitest for testing:

- Compatible with ESM
- Similar API to Jest
- Fast execution with Vite's dev server
- Supports TypeScript natively

The Vitest configuration is in `vitest.config.ts`.

## Environment Variables

The template supports environment variables through dotenv:

```typescript
import dotenv from 'dotenv';
dotenv.config();

// Use environment variables
const apiKey = process.env.API_KEY;
```

## Troubleshooting

### Common Issues

- **Type errors**: Run `pnpm typecheck` to see detailed type errors
- **Module not found**: Check path aliases and import syntax
- **Build errors**: Ensure tsconfig.build.json is properly configured
- **Test failures**: Use `pnpm test:watch` for interactive debugging

### TypeScript Path Alias Resolution

If you experience issues with path aliases not resolving:

1. Ensure the paths in tsconfig.json are correct
2. For testing, verify that vitest is configured to understand the aliases
3. For building, check that tsup is using the correct tsconfig file

## Contributing

When contributing to this template:

1. Follow the existing code style
2. Use ESM import/export syntax
3. Leverage TypeScript features for type safety
4. Add tests for new functionality
5. Document any significant changes

## Key Dependencies

The template includes several key dependencies to enhance development:

### Utility Libraries
- **@mobily/ts-belt**: Functional programming utilities
- **already**: Utility functions for asynchronous operations
- **ts-pattern**: Pattern matching for TypeScript
- **zod**: TypeScript-first schema validation
- **zx**: Tools for shell scripting using JavaScript

### Network & Data
- **axios**: Promise-based HTTP client
- **ws**: WebSocket client and server implementation
- **parse-json**: Safely parse JSON with more helpful errors
- **safe-stable-stringify**: JSON.stringify with circular reference handling

### Development Tools
- **tsx**: Run TypeScript files directly
- **tsup**: Bundle TypeScript projects with esbuild
- **Vitest**: Vite-based testing framework

## Node.js Version Management

The template includes configuration for Volta, a JavaScript tool manager:

```json
"volta": {
  "node": "20.18.0"
}
```

This ensures consistent Node.js versions across development environments.

*Last updated: November 1, 2024*