#!/usr/bin/env pwsh
# Aviation Test App - Sync to 924.html Tool
# This script syncs testData_complete.js to 924.html

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Sync testData to 924.html" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if testData_complete.js exists
if (-not (Test-Path "testData_complete.js")) {
    Write-Host "ERROR: testData_complete.js not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

# Check if 924.html exists
if (-not (Test-Path "924.html")) {
    Write-Host "ERROR: 924.html not found!" -ForegroundColor Red
    exit 1
}

Write-Host "[1/3] Reading testData_complete.js..." -ForegroundColor Yellow
$testDataContent = [System.IO.File]::ReadAllText("$PWD\testData_complete.js", [System.Text.UTF8Encoding]::new($false))

Write-Host "[2/3] Reading 924.html..." -ForegroundColor Yellow
$html924Content = [System.IO.File]::ReadAllText("$PWD\924.html", [System.Text.UTF8Encoding]::new($false))

# Find the testData section in 924.html
Write-Host "[3/3] Syncing testData to 924.html..." -ForegroundColor Yellow

# Extract just the testData object from testData_complete.js
$testDataOnly = $testDataContent

# Validate that testDataContent contains proper structure
if ($testDataOnly -notmatch 'window\.testData\s*=') {
    Write-Host "   ERROR: testData_complete.js does not contain 'window.testData = {...}'" -ForegroundColor Red
    Write-Host "   File format appears to be invalid." -ForegroundColor Yellow
    exit 1
}

# Find and replace the testData section in 924.html
# Pattern: matches from "window.testData = " to the closing "};"
$pattern = '(?s)(window\.testData\s*=\s*)\{.*\};'

if ($html924Content -match $pattern) {
    # Ensure testDataOnly is properly formatted (remove any 'window.testData = ' prefix if present)
    $testDataClean = $testDataOnly -replace '^\s*window\.testData\s*=\s*', ''
    
    # Additional validation: ensure the cleaned data starts with { and ends with };
    if ($testDataClean -notmatch '^\s*\{' -or $testDataClean -notmatch '\};\s*$') {
        Write-Host "   ERROR: testData object structure is invalid" -ForegroundColor Red
        exit 1
    }
    
    # Use a more precise replacement approach
    $startMarker = '<script>window.testData = '
    $endMarker = '};'
    
    $startPos = $html924Content.IndexOf($startMarker)
    if ($startPos -lt 0) {
        Write-Host "   ERROR: Could not find testData start marker in 924.html" -ForegroundColor Red
        exit 1
    }
    
    $searchStart = $startPos + $startMarker.Length
    $endPos = $html924Content.IndexOf($endMarker, $searchStart)
    if ($endPos -lt 0) {
        Write-Host "   ERROR: Could not find testData end marker in 924.html" -ForegroundColor Red
        exit 1
    }
    
    # Include the closing }; in the end position
    $endPos += $endMarker.Length
    
    # Build the new content
    $beforeData = $html924Content.Substring(0, $startPos + $startMarker.Length)
    $afterData = $html924Content.Substring($endPos)
    $new924Content = $beforeData + $testDataClean + $afterData
    [System.IO.File]::WriteAllText("$PWD\924.html", $new924Content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "   SUCCESS: testData synced to 924.html!" -ForegroundColor Green
} else {
    Write-Host "   ERROR: Could not find testData section in 924.html" -ForegroundColor Red
    Write-Host "   Please sync manually." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  SYNC TO 924.html COMPLETE!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""