#!/usr/bin/env pwsh
# Aviation Test App - Sync Tool
# This script syncs testData_complete.js changes to index.html and pushes to GitHub

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Aviation Test App - Sync & Deploy Tool" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if testData_complete.js exists
if (-not (Test-Path "testData_complete.js")) {
    Write-Host "ERROR: testData_complete.js not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

# Check if index.html exists
if (-not (Test-Path "index.html")) {
    Write-Host "ERROR: index.html not found!" -ForegroundColor Red
    exit 1
}

Write-Host "[1/5] Reading testData_complete.js..." -ForegroundColor Yellow
$testDataContent = Get-Content "testData_complete.js" -Raw

Write-Host "[2/5] Reading index.html..." -ForegroundColor Yellow
$indexContent = Get-Content "index.html" -Raw

# Find the testData section in index.html
Write-Host "[3/5] Syncing testData to index.html..." -ForegroundColor Yellow

# Extract just the testData object from testData_complete.js
$testDataOnly = $testDataContent

# Find and replace the testData section in index.html
# Pattern: matches from "window.testData = {" to the closing "};"
$pattern = '(?s)window\.testData\s*=\s*\{.*?\n\s*\};'

if ($indexContent -match $pattern) {
    $newIndexContent = $indexContent -replace $pattern, $testDataOnly
    Set-Content "index.html" -Value $newIndexContent -NoNewline
    Write-Host "   SUCCESS: testData synced to index.html!" -ForegroundColor Green
} else {
    Write-Host "   ERROR: Could not find testData section in index.html" -ForegroundColor Red
    Write-Host "   Please sync manually." -ForegroundColor Yellow
    exit 1
}

# Git operations
Write-Host ""
Write-Host "[4/5] Committing changes to Git..." -ForegroundColor Yellow

# Stage the files
& git add testData_complete.js index.html

# Check if there are changes to commit
$gitStatus = & git status --porcelain
if ([string]::IsNullOrWhiteSpace($gitStatus)) {
    Write-Host "   No changes to commit." -ForegroundColor Yellow
} else {
    # Get current date/time for commit message
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Update questions - $timestamp"
    
    # Commit
    & git commit -m $commitMessage
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   Committed with message: $commitMessage" -ForegroundColor Green
    } else {
        Write-Host "   ERROR: Failed to commit changes" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow

# Push
$pushResult = & git push origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "   SUCCESS: Changes pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "   ERROR: Failed to push to GitHub" -ForegroundColor Red
    Write-Host "   $pushResult" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your changes will be live in 2-3 minutes at:" -ForegroundColor Yellow
Write-Host "https://ah1402.github.io/aviation-test-app/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
