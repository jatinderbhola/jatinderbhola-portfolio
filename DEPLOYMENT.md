# Automatic Deployment Setup for Cloudflare Pages

This guide walks you through setting up automatic deployments to Cloudflare Pages when you push to the `main` branch.

## Prerequisites

- A Cloudflare account (free tier works)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Your repository is accessible to Cloudflare

## Step-by-Step Setup

### 1. Push Your Code to Git

Make sure your code is pushed to your Git repository:

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Connect Repository to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Sign in or create an account

2. **Navigate to Pages**
   - Click **Workers & Pages** in the left sidebar
   - Click **Create application**
   - Select **Pages** tab
   - Click **Connect to Git**

3. **Authorize Git Provider**
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Click **Authorize Cloudflare**
   - Grant necessary permissions
   - Select your repository: `jatinderbhola-portfolio`

4. **Configure Build Settings**
   
   **Project name:**
   ```
   jatinderbhola-portfolio
   ```
   
   **Production branch:**
   ```
   main
   ```
   
   **Build settings:**
   - **Framework preset**: `None` (or `SvelteKit` if available)
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
   - **Root directory**: (leave empty)
   
   **Environment variables:**
   - Usually none required for static sites
   - Add any if your build needs them
   
   **Advanced options:**
   - **Node version**: `20`
   - **Package manager**: `npm`

5. **Save and Deploy**
   - Click **Save and Deploy**
   - Wait for the first deployment to complete (usually 2-5 minutes)

### 3. Verify Automatic Deployments

After the initial deployment succeeds:

1. **Make a test change:**
   ```bash
   # Make a small change to any file
   echo "# Test" >> README.md
   git add README.md
   git commit -m "Test auto-deployment"
   git push origin main
   ```

2. **Check Cloudflare Dashboard:**
   - Go to your Pages project
   - You should see a new deployment automatically triggered
   - Watch it progress: "Queued" → "Building" → "Deploying" → "Active"

3. **Verify the deployment:**
   - Your site URL will be: `https://your-project-name.pages.dev`
   - Changes should appear within 1-2 minutes after push

## Configuration Files

The following files are already configured:

- `.cloudflare/pages.json` - Build configuration
- `svelte.config.js` - Static adapter configuration
- `package.json` - Build scripts

## Branch Deployments

Cloudflare Pages automatically creates:

- **Production deployments**: From `main` branch → Live site
- **Preview deployments**: From pull requests → Preview URLs

## Custom Domain Setup

1. Go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `www.jatinderbhola.com`)
4. Follow DNS configuration instructions
5. Cloudflare will automatically provision SSL certificates

## Troubleshooting

### Build Fails

1. **Check build logs** in Cloudflare Pages dashboard
2. **Verify Node version** is set to `20`
3. **Check build command** is `npm run build`
4. **Verify output directory** is `build`

### Deployments Not Triggering

1. **Verify Git connection** in Cloudflare Pages settings
2. **Check branch name** matches your default branch (`main` or `master`)
3. **Verify repository permissions** in your Git provider
4. **Check webhook status** in Cloudflare Pages settings

### Common Issues

**Error: "Build output directory not found"**
- Ensure `build` directory exists after build
- Check that `npm run build` completes successfully

**Error: "Node version mismatch"**
- Set Node version to `20` in build settings
- Update `.cloudflare/pages.json` if needed

**Deployment stuck on "Building"**
- Check build logs for errors
- Verify all dependencies are in `package.json`
- Ensure build command is correct

## Manual Deployment (Alternative)

If you need to deploy manually without Git:

```bash
npm run build
wrangler pages deploy build --project-name=jatinderbhola-portfolio
```

## Monitoring

- **Deployment history**: View all deployments in Cloudflare Pages dashboard
- **Build logs**: Available for each deployment
- **Analytics**: Available in Cloudflare dashboard (if enabled)
- **Performance**: Cloudflare automatically optimizes your static site

## Next Steps

1. ✅ Set up automatic deployments (this guide)
2. ✅ Configure custom domain (optional)
3. ✅ Set up preview deployments for PRs (automatic)
4. ✅ Monitor deployments and build logs

Your site will now automatically update whenever you push to the `main` branch! 🚀
