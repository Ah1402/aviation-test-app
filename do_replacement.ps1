# Read the files
$dataFile = "src\data\testData.js"
$replacementFile = "performance_replacement.txt"

Write-Host "Reading testData.js..."
$content = Get-Content $dataFile -Raw

Write-Host "Reading replacement content..."
$replacement = Get-Content $replacementFile -Raw

# Find and replace the performance section
# Pattern: from "performance": { to the closing }, before "general-navigation"
$pattern = '(?s)"performance":\s*\{.*?\n  \},\s*\n  "general-navigation":'
$newContent = '"performance": {' + "`n" + ($replacement -replace '^\s*"performance":\s*\{', '').TrimStart() -replace '\},\s*$', '},  ' + "`n  `"general-navigation`":"

Write-Host "Performing replacement..."
if ($content -match $pattern) {
    $content = $content -replace $pattern, $newContent
    
    Write-Host "Writing updated file..."
    Set-Content -Path $dataFile -Value $content -NoNewline
    
    Write-Host "✓ Successfully replaced performance section!"
    Write-Host "✓ File updated: $dataFile"
} else {
    Write-Host "ERROR: Could not find performance section pattern"
    Write-Host "File not modified."
}
