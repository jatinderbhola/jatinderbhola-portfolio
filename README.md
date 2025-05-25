# Jatinder Bhola Portfolio

[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Built with AI](https://img.shields.io/badge/Built%20with%20AI-00A67E?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/jatinderbhola)

This is an open-source portfolio project built with SvelteKit. Feel free to clone, modify, and deploy it for your own use!

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

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jatinderbhola/jatinderbhola-portfolio.git
   cd jatinderbhola-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:5173](http://localhost:5173).

### Customization
- Update `default-resume.json` with your personal information.
- Modify the components in `src/lib/components` to suit your needs.

## Deployment to Vercel
This project is configured for easy deployment on Vercel:

1. Push your changes to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
3. Click "New Project" and select your repository.
4. Vercel will automatically detect the SvelteKit project and deploy it for free.

## License
This project is open source and available under the MIT License.

