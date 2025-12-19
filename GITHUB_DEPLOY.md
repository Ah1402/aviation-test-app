# Quick Deploy to GitHub Pages

## One-Time Setup

1. **Create GitHub Repository** (if not already done)
   - Go to https://github.com/new
   - Name: `aviation-test-app`
   - Public repository
   - Click "Create repository"

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click Save

3. **Configure Repository** (if first time)
   ```bash
   cd "c:\Users\ahmed\Desktop\final younes\final\aviation-test-app"
   git init
   git add .
   git commit -m "Initial commit - Aviation Test App with offline support"
   git branch -M main
   git remote add origin https://github.com/ah1402/aviation-test-app.git
   git push -u origin main
   ```

## Regular Updates

### Quick Update (after making changes)
```bash
cd "c:\Users\ahmed\Desktop\final younes\final\aviation-test-app"
git add .
git commit -m "Update: [describe your changes]"
git push
```

### Using the Sync Scripts

**Option 1: Sync Everything**
```bash
.\SYNC_AND_DEPLOY.ps1
```

**Option 2: Sync testData_complete.js to HTML files**
```bash
.\SYNC_924.ps1
```

**Option 3: Use AVIATION_MANAGER.bat**
```
Run AVIATION_MANAGER.bat
Choose option [8] - Deploy to GitHub
```

## Common Deployment Scenarios

### Scenario 1: Added New Questions
1. Questions added to `testData_complete.js`
2. Run: `.\SYNC_924.ps1` (syncs to index.html and 924.html)
3. Commit: `git add . && git commit -m "Added [X] new questions"`
4. Deploy: `git push`
5. Users will see "Update Available" within 5 minutes

### Scenario 2: Fixed Answers
1. Corrections applied to `testData_complete.js`
2. Run: `.\SYNC_924.ps1`
3. Commit: `git add . && git commit -m "Fixed answers for IDs: [list IDs]"`
4. Deploy: `git push`

### Scenario 3: UI/Feature Changes
1. Modified `index.html` or other files
2. Update version in `sw.js`: `const CACHE_VERSION = 'v2.0.1';`
3. Commit: `git add . && git commit -m "Feature: [describe feature]"`
4. Deploy: `git push`
5. Users will be prompted to update immediately

### Scenario 4: Emergency Fix
1. Make critical fix
2. Increment version in `sw.js`: `const CACHE_VERSION = 'v2.1.0';`
3. Commit: `git add . && git commit -m "Hotfix: [describe issue]"`
4. Deploy: `git push`
5. All users will update on next visit

## Verify Deployment

After pushing:
1. Wait 1-2 minutes
2. Visit: https://ah1402.github.io/aviation-test-app/
3. Open DevTools (F12) → Network tab
4. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
5. Check console for Service Worker messages
6. Verify changes are live

## Rollback (if needed)

If something goes wrong:
```bash
# Find the last good commit
git log --oneline

# Revert to that commit (replace COMMIT_HASH with actual hash)
git revert COMMIT_HASH

# Push the revert
git push
```

## Deployment Checklist

Before each deployment:
- [ ] Test changes locally
- [ ] Run syntax validation: `node -c index.html` (if using Node.js HTML parser)
- [ ] Check Service Worker: `node -c sw.js`
- [ ] Verify question count matches expectations
- [ ] Test offline functionality locally
- [ ] Update version in `sw.js` if needed
- [ ] Write descriptive commit message
- [ ] Push to GitHub
- [ ] Wait 2 minutes and verify live site
- [ ] Test on mobile device (if UI changes)

## GitHub Pages URL

Your app is live at:
**https://ah1402.github.io/aviation-test-app/**

Share this URL with users. They can:
- Bookmark it
- Add to home screen (mobile)
- Install as PWA

## Monitoring Deployments

### Check Deployment Status
1. Go to: https://github.com/ah1402/aviation-test-app/deployments
2. See history of all deployments
3. Each push creates a new deployment
4. Green checkmark = successful
5. Red X = failed (check Actions tab)

### View Build Logs
1. Go to Actions tab: https://github.com/ah1402/aviation-test-app/actions
2. Click on latest workflow run
3. See detailed logs if deployment fails

## Tips

1. **Commit Often**: Small, frequent commits are better than large ones
2. **Descriptive Messages**: Use clear commit messages
3. **Test First**: Always test locally before pushing
4. **Version Control**: Increment `CACHE_VERSION` for major changes
5. **Backup**: Keep local backups of `testData_complete.js`

## Troubleshooting

### Deployment Not Updating
- Check GitHub Pages settings are correct
- Wait 2-5 minutes (can take time to deploy)
- Hard refresh browser: `Ctrl+Shift+R`
- Check GitHub Actions for errors

### Service Worker Not Updating
- Increment version in `sw.js`
- Push changes
- Users will get update prompt automatically

### Changes Not Visible
- Clear browser cache
- Unregister Service Worker (DevTools → Application → Service Workers)
- Hard refresh page

## Quick Commands

```bash
# Status of changes
git status

# See what changed
git diff

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push

# View commit history
git log --oneline

# Current branch
git branch

# Pull latest from GitHub
git pull
```

---

**Repository**: https://github.com/ah1402/aviation-test-app  
**Live URL**: https://ah1402.github.io/aviation-test-app/  
**Last Updated**: December 9, 2025
