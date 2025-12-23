#!/usr/bin/env pwsh
# Aviation Test App - Sync Tool
# This script syncs testData_complete.js changes to index.html and pushes to GitHub

param(
    [switch]$SkipDeploy,
    [switch]$DeployOnly
)

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Aviation Test App - Sync & Deploy Tool" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# If DeployOnly, skip to git operations
if ($DeployOnly) {
    Write-Host "Deploy-only mode - skipping sync..." -ForegroundColor Yellow
    goto GitOperations
}

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
$testDataContent = [System.IO.File]::ReadAllText("$PWD\testData_complete.js", [System.Text.UTF8Encoding]::new($false))

Write-Host "[2/5] Reading index.html..." -ForegroundColor Yellow
$indexContent = [System.IO.File]::ReadAllText("$PWD\index.html", [System.Text.UTF8Encoding]::new($false))

# Find the testData section in index.html
Write-Host "[3/5] Syncing testData to index.html..." -ForegroundColor Yellow

# Extract just the testData object from testData_complete.js
$testDataOnly = $testDataContent

# Validate that testDataContent contains proper structure
if ($testDataOnly -notmatch 'window\.testData\s*=') {
    Write-Host "   ERROR: testData_complete.js does not contain 'window.testData = {...}'" -ForegroundColor Red
    Write-Host "   File format appears to be invalid." -ForegroundColor Yellow
    exit 1
}

# Find and replace the testData section in index.html
# Pattern: matches from "window.testData = " to the closing "};" with proper greedy matching
$pattern = '(?s)(window\.testData\s*=\s*)\{.*\};'

if ($indexContent -match $pattern) {
    # Ensure testDataOnly is properly formatted (remove any 'window.testData = ' prefix if present)
    $testDataClean = $testDataOnly -replace '^\s*window\.testData\s*=\s*', ''
    
    # Additional validation: ensure the cleaned data starts with { and ends with };
    if ($testDataClean -notmatch '^\s*\{' -or $testDataClean -notmatch '\};\s*$') {
        Write-Host "   ERROR: testData object structure is invalid" -ForegroundColor Red
        exit 1
    }
    
    # Use a more precise replacement approach to avoid greedy matching issues
    $startMarker = '<script>window.testData = '
    $endMarker = '};'
    
    $startPos = $indexContent.IndexOf($startMarker)
    if ($startPos -lt 0) {
        Write-Host "   ERROR: Could not find testData start marker in index.html" -ForegroundColor Red
        exit 1
    }
    
    $searchStart = $startPos + $startMarker.Length
    $endPos = $indexContent.IndexOf($endMarker, $searchStart)
    if ($endPos -lt 0) {
        Write-Host "   ERROR: Could not find testData end marker in index.html" -ForegroundColor Red
        exit 1
    }
    
    # Include the closing }; in the end position
    $endPos += $endMarker.Length
    
    # Build the new content
    $beforeData = $indexContent.Substring(0, $startPos + $startMarker.Length)
    $afterData = $indexContent.Substring($endPos)
    $newIndexContent = $beforeData + $testDataClean + $afterData
    [System.IO.File]::WriteAllText("$PWD\index.html", $newIndexContent, [System.Text.UTF8Encoding]::new($false))
    Write-Host "   SUCCESS: testData synced to index.html!" -ForegroundColor Green
} else {
    Write-Host "   ERROR: Could not find testData section in index.html" -ForegroundColor Red
    Write-Host "   Please sync manually." -ForegroundColor Yellow
    exit 1
}

# Label for DeployOnly mode
:GitOperations

# If SkipDeploy, exit here
if ($SkipDeploy) {
    Write-Host ""
    Write-Host "Sync completed (deployment skipped)" -ForegroundColor Green
    exit 0
}

# Git operations
Write-Host ""
Write-Host "[4/5] Committing changes to Git..." -ForegroundColor Yellow

# Stage the files
& git add testData_complete.js index.html 924.html logo.png logo-192.png logo-512.png manifest.json

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
