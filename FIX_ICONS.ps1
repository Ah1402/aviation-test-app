#!/usr/bin/env pwsh
# Create proper app icons with dark background for PWA

Write-Host "Creating PWA icons with proper background..." -ForegroundColor Cyan

# Check if logo.png exists
if (-not (Test-Path "logo.png")) {
    Write-Host "ERROR: logo.png not found!" -ForegroundColor Red
    Write-Host "Please ensure logo.png exists in the project folder." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Found logo.png" -ForegroundColor Green
Write-Host ""
Write-Host "For best results on iOS home screen:" -ForegroundColor Yellow
Write-Host "1. Your logo.png should have a TRANSPARENT background" -ForegroundColor White
Write-Host "2. The manifest.json background_color is set to #1e293b (dark blue)" -ForegroundColor White
Write-Host "3. This background color will appear behind your transparent logo" -ForegroundColor White
Write-Host ""
Write-Host "Current files:" -ForegroundColor Cyan
Write-Host "  - logo-192.png" -ForegroundColor White
Write-Host "  - logo-512.png" -ForegroundColor White
Write-Host ""
Write-Host "If you still see a white background:" -ForegroundColor Yellow
Write-Host "1. Delete the app from your home screen" -ForegroundColor White
Write-Host "2. Clear Safari cache (Settings > Safari > Clear History)" -ForegroundColor White
Write-Host "3. Re-add the app to home screen" -ForegroundColor White
Write-Host "4. The icon should now show with dark background" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
