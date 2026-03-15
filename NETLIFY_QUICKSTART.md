# Quick Start: Deploy to Netlify

## 3-Minute Setup

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: iXBRL tagging decision tree"
git branch -M main
git remote add origin https://github.com/yourusername/ixbrl-tagging-decision-tree.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to **netlify.com**
2. Click **"Sign up"** (use GitHub account)
3. Click **"New site from Git"**
4. Select your repository
5. Netlify will auto-detect the settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **"Deploy site"**

Done! Your site will be live in 2-3 minutes.

## Your Site URL

Netlify will assign a random domain like: `https://agile-dragon-4f2c9e.netlify.app`

To use a custom domain:
1. Go to **Site settings** → **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `ixbrl-tagger.frc.org.uk`)
4. Follow DNS setup instructions

## Automatic Deployments

Every time you push to `main` branch, Netlify will automatically:
1. Pull your latest code
2. Run `npm run build`
3. Deploy the `dist/` folder

## Monitoring

- **Netlify Dashboard**: See all deployments and build logs
- **Build Logs**: Click on any deployment to see build details
- **Preview Deploys**: Each commit gets a unique preview URL (optional)

## Troubleshooting

**Build fails?**
- Check build logs in Netlify dashboard
- Verify `npm run build` works locally

**Site shows old version?**
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check deployment timestamp in Netlify dashboard

**Can't find package.json?**
- Ensure root directory contains package.json
- Check git repository includes all project files

## Next Steps

- Customize domain name
- Add environment variables (if needed)
- Enable branch preview deploys
- Set up custom build notifications
- Connect to GitHub for automatic deployments

Questions? Check the main README.md for detailed instructions.
