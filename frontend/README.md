# Personal Finance Dashboard

A frontend application that allows users to import transaction history, view categorized transactions, and generate reports. Built with React 19, TypeScript, Vite, Mantine UI, Tailwind CSS 4, and TanStack Query.

> **Note:** Transaction importing and expense categorization are not yet implemented. The application uses seeded data.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm

### Install Dependencies

```bash
npm install
```

**Note**: `.npmrc` ensures exact versions are installed for deterministic builds.

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

The development server runs on `http://localhost:5173` by default.

### Code Quality

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check code formatting
npm run format:check
```

## Code Style

### Import Sorting

Enforced via ESLint (`eslint-plugin-simple-import-sort`). Run `npm run lint:fix` to auto-sort.

### JSX Props Sorting

Enforced via ESLint (`react/jsx-sort-props`):

- Reserved props (key, ref) first
- Regular props alphabetically
- Callbacks/event handlers last

### Prettier

Formats code with:

- 80 character line width
- Semicolons enabled
- Double quotes
- 2 space indentation
- Trailing commas (all)
- Arrow function parentheses (always)
- LF line endings (Unix-style)
- Tailwind class sorting via `prettier-plugin-tailwindcss`

## Configuration

### TypeScript

Project uses TypeScript project references:

- `tsconfig.app.json` - Application code config
- `tsconfig.node.json` - Build tooling config
- `tsconfig.json` - Root config referencing both

## License

MIT
