# How Blog Setup Works with Cloudflare Pages

## Overview

This project uses **static site generation** with `@sveltejs/adapter-static`. All server-side code (including blog post processing) runs **during the build process** on Cloudflare's build servers, not at runtime.

## How It Works

### 1. Build Process on Cloudflare Pages

When you push to your `main` branch, Cloudflare Pages:

1. **Clones your repository**
2. **Installs dependencies** (`npm install`)
   - This includes the `js-yaml` override to ensure compatibility
3. **Runs the build command** (`npm run build`)
4. **During build, all server-side code executes:**
   - `src/routes/blog/[slug]/+page.server.ts` runs
   - `entries()` function generates all blog post slugs
   - `getAllPosts()` reads markdown files from `static/posts/`
   - `getPostBySlug()` processes each markdown file:
     - Parses frontmatter with `gray-matter`
     - Converts markdown to HTML with `remark`
     - Calculates reading time
   - All blog posts are prerendered as static HTML
5. **Outputs static files** to `build/` directory
6. **Deploys the static files** to Cloudflare's CDN

### 2. Runtime (After Deployment)

Once deployed, Cloudflare Pages serves **only static files**:
- ✅ Static HTML files (prerendered blog posts)
- ✅ CSS and JavaScript bundles
- ✅ Images and other assets
- ❌ **No Node.js runtime**
- ❌ **No server-side code execution**
- ❌ **No file system access**

### 3. Why `$lib/server/blog.ts` Works

The `$lib/server/` directory is a SvelteKit convention that:
- ✅ **During build**: Code runs normally (Node.js environment with `process`, `fs`, etc.)
- ✅ **In browser**: Code is **never bundled or executed** (Vite/SvelteKit excludes it)

This means:
- `process.cwd()` works during build ✅
- `fs.readFileSync()` works during build ✅
- `gray-matter` and `remark` work during build ✅
- None of this code runs in the browser ✅

## File Structure

```
static/posts/              # Markdown files (source)
  ├── post-1.md
  └── post-2.md

build/                     # Generated static files (deployed)
  ├── blog/
  │   ├── post-1/
  │   │   ├── index.html   # Prerendered HTML
  │   │   └── __data.json  # Prerendered data
  │   └── post-2/
  │       ├── index.html
  │       └── __data.json
  └── ...

src/lib/server/blog.ts     # Server-only code (runs during build)
src/routes/blog/
  ├── +page.server.ts      # Server load function (runs during build)
  └── [slug]/
      └── +page.server.ts  # Server load + entries() (runs during build)
```

## Build Configuration

### `.cloudflare/pages.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "nodeVersion": "20"
}
```

### `package.json` Overrides
```json
{
  "overrides": {
    "js-yaml": "3.14.2"
  }
}
```
This ensures `gray-matter` works correctly with the YAML parser.

## What Happens During Build

1. **Prerendering Phase**:
   ```typescript
   // src/routes/blog/[slug]/+page.server.ts
   export async function entries() {
     const posts = await getAllPosts(); // Reads static/posts/*.md
     return posts.map((post) => ({ slug: post.slug }));
   }
   ```
   This generates: `/blog/post-1`, `/blog/post-2`, etc.

2. **For Each Blog Post**:
   ```typescript
   export const load: PageServerLoad = async ({ params }) => {
     const post = await getPostBySlug(params.slug);
     // Processes markdown → HTML
     // Returns data for prerendering
   }
   ```

3. **Output**:
   - Each blog post becomes a static HTML file
   - All data is serialized into `__data.json`
   - No server needed at runtime

## Testing Locally

Before deploying, test the build process:

```bash
# Build the static site
npm run build

# Preview the static build
npm run preview

# Visit http://localhost:4173/blog/post-slug
```

If it works locally, it will work on Cloudflare Pages.

## Deployment Checklist

- ✅ `@sveltejs/adapter-static` configured
- ✅ All routes have `prerender = true`
- ✅ Blog utilities in `$lib/server/` (server-only)
- ✅ `entries()` function in `+page.server.ts`
- ✅ `js-yaml` override in `package.json`
- ✅ Build output directory: `build`
- ✅ Node version: 20

## Troubleshooting

### Build Fails on Cloudflare

1. **Check build logs** in Cloudflare Pages dashboard
2. **Verify Node version** is set to 20
3. **Check dependencies** are installed correctly
4. **Verify `static/posts/` directory** exists in repo

### Blog Posts Not Showing

1. **Check markdown files** are in `static/posts/`
2. **Verify frontmatter** is correct (title, date, published, etc.)
3. **Check build logs** for errors during prerendering
4. **Verify `entries()` function** is generating slugs

### Runtime Errors (After Deployment)

If you see errors about `process` or `fs`:
- ❌ This shouldn't happen with static adapter
- Check that code isn't being imported in client components
- Verify `$lib/server/` imports are only in `+page.server.ts` files

## Benefits of This Approach

1. **Fast**: Static HTML served from CDN (no server processing)
2. **Reliable**: No server-side dependencies at runtime
3. **Scalable**: Cloudflare CDN handles traffic automatically
4. **Cost-effective**: Free tier covers most use cases
5. **SEO-friendly**: All content is prerendered HTML

## Adding New Blog Posts

1. Add markdown file to `static/posts/your-post.md`
2. Include required frontmatter:
   ```yaml
   ---
   title: 'Your Post Title'
   description: 'Post description'
   date: '2025-01-27'
   tags: ['Tag1', 'Tag2']
   published: true
   author: 'Your Name'
   ---
   ```
3. Commit and push to `main` branch
4. Cloudflare Pages automatically rebuilds and deploys
5. New post appears at `/blog/your-post`
