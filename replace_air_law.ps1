# Backup and replace the Air Law section in src/data/testData.js using brace matching.
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$testData = Join-Path $repoRoot 'src/data/testData.js'
$newSection = Join-Path $repoRoot 'air_law_new.txt'
$backup = Join-Path $repoRoot ('testData_backup_air_law_' + (Get-Date -Format 'yyyyMMdd_HHmmss') + '.js')

if (!(Test-Path $testData)) { throw "testData.js not found: $testData" }
if (!(Test-Path $newSection)) { throw "New section file not found: $newSection" }

Copy-Item $testData $backup -Force

$content = Get-Content $testData -Raw
# Find the start of the air-law block (key or name)
$pattern = '"air-law"\s*:\s*\{'
$match = [regex]::Match($content, $pattern)
if (-not $match.Success) { throw 'Could not find start of "air-law" block' }
$startIndex = $match.Index

# Brace match from the first '{' after the key
$openBraceIndex = $content.IndexOf('{', $startIndex)
if ($openBraceIndex -lt 0) { throw 'Could not locate opening brace for air-law block' }
$depth = 0
$endIndex = -1
for ($i = $openBraceIndex; $i -lt $content.Length; $i++) {
  if ($content[$i] -eq '{') { $depth++ }
  elseif ($content[$i] -eq '}') { $depth-- }
  if ($depth -eq 0) { $endIndex = $i; break }
}
if ($endIndex -lt 0) { throw 'Failed to find end of air-law block' }

$new = Get-Content $newSection -Raw

# Replace the block from startIndex to endIndex with $new
$before = $content.Substring(0, $startIndex)
$after = $content.Substring($endIndex + 1)
$updated = $before + $new + $after

Set-Content -Path $testData -Value $updated -Encoding UTF8

Write-Host "Air Law section replaced successfully." -ForegroundColor Green
Write-Host "Backup saved to: $backup"
