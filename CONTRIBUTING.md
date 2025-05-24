# Contributing to Portfolio Template

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/jatinderbhola/jatinderbhola-portfolio.git
   cd portfolio-template
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
portfolio-template/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── stores/        # Svelte stores
│   │   └── types/         # TypeScript types
│   └── routes/            # SvelteKit routes
├── static/
│   └── profiles/          # Resume JSON files
├── tests/                 # Test files
└── vitest.config.ts       # Vitest configuration
```

## Adding a New Profile

1. Create a new JSON file in `static/profiles/`
2. Follow the structure in `test.json`
3. Update the Header component to include your profile
4. Test the profile switching functionality

## Testing

1. Run unit tests:
   ```bash
   npm test
   ```
2. Write tests for new components
3. Ensure all tests pass before submitting PR

## Pull Request Process

1. Create a new branch for your feature/fix
2. Make your changes
3. Write/update tests
4. Update documentation if needed
5. Submit a pull request

## Commit Message Format

We follow the conventional commits specification:

```
<type>: <subject>

<body>
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding/updating tests
- chore: Maintenance tasks

## Code Style

- Use TypeScript for type safety
- Follow Svelte best practices
- Use TailwindCSS for styling
- Write meaningful comments
- Keep components small and focused

## Questions?

Feel free to open an issue for any questions or concerns. 