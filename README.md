# Modern Portfolio Template

A modern, performant, and accessible portfolio website built with SvelteKit. This template allows you to create a beautiful portfolio using a JSON-based resume format.

## Features

- 🚀 Built with SvelteKit for optimal performance
- 🎨 Modern UI with TailwindCSS
- ♿ Accessibility-first design
- 🔍 SEO optimized
- 📱 Fully responsive
- 🌐 Multi-profile support
- 📊 Structured data for better SEO
- 🎯 Performance optimized
- 🧪 Testing setup with Vitest and Testing Library
- 📚 Storybook for component development
- 🌍 Multi-language support (English, Chinese, Hindi, French, Spanish)

## Language Support

The template includes built-in support for multiple languages:

1. Available Languages:
   - English (en)
   - Chinese (中文)
   - Hindi (हिन्दी)
   - French (Français)
   - Spanish (Español)

2. Adding Translations:
   - Translation files are located in `src/lib/i18n/translations/`
   - Each language has its own JSON file (e.g., `en.json`, `zh.json`)
   - Follow the existing structure for new translations

3. Language Configuration:
   - Language settings are in `src/lib/i18n/config.ts`
   - Add new languages by extending the `languages` object
   - Include language metadata (name, nativeName, direction, dateFormat)

4. Using Translations:
   - Use the `t()` function from `$lib/i18n/utils`
   - Example: `{t('nav.home')}`
   - Supports nested keys and parameters

5. Language Switcher:
   - Automatically available in the header
   - Persists language preference
   - Updates URL with language parameter

## Getting Started

1. Clone this repository:
```