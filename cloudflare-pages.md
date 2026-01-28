# Cloudflare Pages Deployment Guide

This project is configured for **static deployment** on Cloudflare Pages (no server required).

## ✅ What's Been Configured

1. **Adapter**: Switched from `@sveltejs/adapter-cloudflare` to `@sveltejs/adapter-static`
2. **Prerendering**: Enabled for all routes via `src/routes/+layout.ts`
3. **Build Output**: Configured to output to `build/` directory
4. **Server Hooks**: Updated to handle prerendering (no searchParams access during build)
5. **Gallery Route**: Fixed to read images from `static/portfolio-images/` at build time

## Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Node Version**: 20

## Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure build settings:
   - **Framework preset**: `None` or `SvelteKit`
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
   - **Root directory**: `/` (leave empty if root)
   - **Node version**: `20`
5. Click **Save and Deploy**

Your site will automatically deploy on every push to your main branch.

### Option 2: Deploy via Wrangler CLI

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   npm run build
   wrangler pages deploy build --project-name=your-project-name
   ```

## Configuration Files

- `svelte.config.js` - Configured with `@sveltejs/adapter-static`
- `src/routes/+layout.ts` - Enables prerendering for all routes
- `src/routes/*/+page.ts` - Individual route prerender configs
- `src/hooks.server.ts` - Updated to handle prerendering
- `static/_redirects` - Cloudflare Pages redirects file
- `.cloudflare/pages.json` - Cloudflare Pages build configuration (optional)

## Testing Locally

Before deploying, test the static build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to preview your static site.

## Notes

- ✅ The site is **fully static** (no server-side rendering)
- ✅ All routes are **prerendered at build time**
- ✅ The gallery route reads images from `static/portfolio-images/` at build time
- ✅ Query parameters (like `?lang=en&profile=default`) will work client-side but default values are used during prerendering

## Troubleshooting

If you encounter build errors:

1. **Check Node version**: Ensure you're using Node 20
2. **Clean build**: Remove `.svelte-kit` and `build` directories, then rebuild
3. **Check dependencies**: Run `npm install` to ensure all dependencies are installed
4. **Verify paths**: Ensure `static/portfolio-images/` contains your images

## Custom Domain

After deployment, you can add a custom domain in the Cloudflare Pages dashboard:
1. Go to your project → **Custom domains**
2. Add your domain and follow DNS configuration instructions
