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

## Getting Started

1. Clone this repository:
```bash
git clone <your-repo-url>
cd portfolio-template
```

2. Install dependencies:
```bash
npm install
```

3. Add your resume JSON:
   - Place your resume JSON file in `static/profiles/`
   - Name it `default.json` or create multiple profiles
   - See `static/profiles/test.json` for an example profile

4. Start the development server:
```bash
npm run dev
```

## Managing Multiple Profiles

The template supports multiple profiles through JSON files in the `static/profiles/` directory:

1. Create a new profile:
   - Add a new JSON file in `static/profiles/` (e.g., `test.json`)
   - Follow the same structure as `default.json`
   - The profile name will be used in the URL (e.g., `?profile=test`)

2. Profile Structure:
```json
{
  "seoTags": {
    "leadership": ["skill1", "skill2"],
    "technicalSkills": ["skill1", "skill2"],
    // ... other tags
  },
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    // ... other personal info
  },
  // ... other sections
}
```

3. Switching Profiles:
   - Use the dropdown in the header to switch between profiles
   - Profiles are loaded server-side for optimal SEO
   - Each profile maintains its own structured data

## Testing

The project uses Vitest and Testing Library for testing:

1. Run unit tests:
```bash
npm test
```

2. Test Structure:
   - Tests are located alongside components (e.g., `Component.test.ts`)
   - Use `@testing-library/svelte` for component testing
   - Mock SvelteKit stores and modules as needed

3. Example Test:
```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import YourComponent from './YourComponent.svelte';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(YourComponent);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Customization

### Styling
- The template uses TailwindCSS for styling
- Customize colors and theme in `tailwind.config.js`
- Modify components in `src/lib/components/`

### Adding New Sections
1. Create a new component in `src/lib/components/sections/`
2. Add the component to `src/routes/+page.svelte`
3. Update the TypeScript types in `src/lib/types/resume.ts`

## Performance Optimization

The template includes several performance optimizations:
- Lazy loading of components
- Optimized images
- Minimal JavaScript bundle
- Efficient CSS with TailwindCSS
- Server-side rendering with SvelteKit

## SEO Features

- Dynamic meta tags
- Structured data
- Semantic HTML
- SEO-friendly URLs
- Sitemap generation
- Robots.txt

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this template for your personal portfolio!

## Support

If you have any questions or need help, please open an issue in the repository.
