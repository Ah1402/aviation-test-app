param(
    [string]$OutDir = "dist",
    [string]$Name = "aviation-test-app-portable"
)

$ErrorActionPreference = 'Stop'

Write-Host "Preparing portable package..." -ForegroundColor Cyan

# Paths
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$proj = Split-Path -Parent $root
$dist = Join-Path $proj $OutDir
$stage = Join-Path $dist 'portable_build'

# Clean staging
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stage | Out-Null

# Helper to copy with structure
function Copy-ItemSafe($path) {
    $src = Join-Path $proj $path
    if (Test-Path $src) {
        Copy-Item $src -Destination $stage -Recurse -Force
    }
}

# Generate fresh standalone
powershell -ExecutionPolicy Bypass -File (Join-Path $proj 'create-standalone.ps1') | Out-Host

# Copy essential files and folders
Copy-ItemSafe 'index.html'
Copy-ItemSafe 'STANDALONE.html'
Copy-ItemSafe 'CLEAR_CACHE.html'
Copy-ItemSafe 'HOW_TO_UPDATE.html'
Copy-ItemSafe 'START_HERE.html'
Copy-ItemSafe 'OPEN_ME_FOR_MOBILE.html'
Copy-ItemSafe 'START_APP.bat'
Copy-ItemSafe 'START_APP.sh'
Copy-ItemSafe 'sw.js'
Copy-ItemSafe 'README.md'
Copy-ItemSafe 'UPDATE_LOG.md'
Copy-ItemSafe 'README_PORTABLE.md'
Copy-ItemSafe 'README_MOBILE.txt'
Copy-ItemSafe 'PORTABLE_INSTRUCTIONS.md'
Copy-ItemSafe 'MOBILE_INSTRUCTIONS.md'
Copy-ItemSafe 'OFFLINE_SUPPORT.md'
Copy-ItemSafe 'STANDALONE_README.md'

# Copy src folder (data, scripts, styles)
Copy-ItemSafe 'src'

# Optional: include www if present (capacitor)
Copy-ItemSafe 'www'

# Create output zip
if (-not (Test-Path $dist)) { New-Item -ItemType Directory -Force -Path $dist | Out-Null }
$timestamp = Get-Date -Format 'yyyyMMdd-HHmm'
$zipName = "$Name-$timestamp.zip"
$zipPath = Join-Path $dist $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

Write-Host "Creating zip: $zipPath" -ForegroundColor Yellow
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zipPath -Force

# Summary
$sizeMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host "✅ Portable package created: $zipName ($sizeMB MB)" -ForegroundColor Green
Write-Host "Location: $dist" -ForegroundColor Cyan
