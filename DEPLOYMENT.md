# Aviation Test App - Deployment Guide

## Deploy to aviationtestapp.com using GitHub Pages

### Prerequisites
- GitHub account
- Domain registered at aviationtestapp.com
- Git installed on your computer

---

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Repository settings:
   - **Name**: `aviation-test-app` (or any name you prefer)
   - **Description**: Aviation Knowledge Test Center
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
4. Click **Create repository**

---

## Step 2: Push Code to GitHub

Open PowerShell in your project folder and run:

```powershell
# Initialize Git repository (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial deployment of Aviation Test App"

# Add your GitHub repository as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/aviation-test-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `USERNAME`** with your actual GitHub username in the URL above.

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar under "Code and automation")
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. GitHub will display: *"Your site is ready to be published at `https://USERNAME.github.io/aviation-test-app/`"*

Wait 2-3 minutes for the deployment to complete.

---

## Step 4: Configure Custom Domain (aviationtestapp.com)

### A. Configure DNS at Your Domain Registrar

Log in to where you registered **aviationtestapp.com** (Namecheap, GoDaddy, etc.) and add these DNS records:

**Option 1: Use A Records (Recommended)**
```
Type: A
Host: @
Value: 185.199.108.153
TTL: Automatic or 3600

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153

Type: CNAME
Host: www
Value: USERNAME.github.io
TTL: Automatic or 3600
```

**Option 2: Use CNAME (Alternative)**
```
Type: CNAME
Host: @
Value: USERNAME.github.io
TTL: Automatic or 3600

Type: CNAME
Host: www
Value: USERNAME.github.io
TTL: Automatic or 3600
```

**Replace `USERNAME`** with your GitHub username.

### B. Configure GitHub Pages Custom Domain

1. In your repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `aviationtestapp.com`
3. Click **Save**
4. Check **Enforce HTTPS** (wait for certificate to provision - may take up to 24 hours)

---

## Step 5: Verify Deployment

1. **GitHub Pages URL**: Visit `https://USERNAME.github.io/aviation-test-app/`
2. **Custom Domain**: Visit `https://aviationtestapp.com` (after DNS propagation, 1-48 hours)

Check DNS propagation: https://dnschecker.org

---

## Updating Your App

To deploy updates:

```powershell
# Make your changes to 924.html or other files

# Stage changes
git add .

# Commit with a message
git commit -m "Update app with new features"

# Push to GitHub
git push
```

GitHub Pages will automatically redeploy within 2-3 minutes.

---

## File Structure for Deployment

```
aviation-test-app/
├── index.html          # Main app (renamed from 924.html)
├── manifest.json       # PWA manifest
├── CNAME              # Custom domain configuration
├── .gitignore         # Files to exclude from repository
├── README.md          # Project documentation
└── DEPLOYMENT.md      # This file
```

---

## Troubleshooting

### App not loading
- Check GitHub Actions tab for deployment status
- Verify `index.html` exists in repository root
- Clear browser cache and try incognito mode

### Custom domain not working
- Verify DNS records are correct (use dnschecker.org)
- Wait 24-48 hours for DNS propagation
- Check GitHub Pages settings show "DNS check successful"
- Make sure CNAME file contains only: `aviationtestapp.com`

### HTTPS certificate error
- Wait up to 24 hours for certificate provisioning
- Try removing and re-adding the custom domain in GitHub Pages settings
- Ensure "Enforce HTTPS" is checked

### App works on GitHub but not custom domain
- Verify CNAME file is in repository root
- Check DNS records point to correct GitHub IPs
- Wait for DNS propagation (check progress at dnschecker.org)

---

## Alternative: Using Netlify (Faster Setup)

If GitHub Pages is too slow or complex:

1. Sign up at [Netlify](https://www.netlify.com)
2. Drag and drop your `index.html` file
3. Configure domain in Netlify settings
4. Update DNS to point to Netlify servers

Netlify provides instant deployments and automatic HTTPS.

---

## Cost

- **GitHub Pages**: Free for public repositories
- **Domain Registration**: $10-15/year (aviationtestapp.com)
- **HTTPS Certificate**: Free (automatic with GitHub Pages)

---

## Support

For issues:
- GitHub Pages Documentation: https://docs.github.com/pages
- GitHub Community: https://github.community
- DNS Issues: Contact your domain registrar

**Your app is now ready to be published to the world! 🚀**
