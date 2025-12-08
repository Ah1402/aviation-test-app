# Simple line-by-line replacement script
$dataFile = "src\data\testData.js"
$replacementFile = "performance_replacement.txt"

# Read all lines
Write-Host "Reading files..."
$lines = Get-Content $dataFile
$replacementLines = Get-Content $replacementFile

# Find start and end of performance section
$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s*"performance":\s*\{') {
        $startLine = $i
        Write-Host "Found performance start at line" ($i + 1)
    }
    if ($startLine -ge 0 -and $lines[$i] -match '^\s*"general-navigation":\s*\{') {
        $endLine = $i - 1
        Write-Host "Found performance end at line" ($i)
        break
    }
}

if ($startLine -ge 0 -and $endLine -ge 0) {
    Write-Host "Replacing lines" ($startLine + 1) "to" ($endLine + 1)
    
    # Build new content
    $newLines = @()
    $newLines += $lines[0..($startLine - 1)]  # Before performance
    $newLines += $replacementLines             # New performance section
    $newLines += $lines[$endLine..$($lines.Count - 1)]  # After performance
    
    # Write to file
    Write-Host "Writing updated file..."
    $newLines | Set-Content $dataFile
    
    $oldCount = $endLine - $startLine + 1
    Write-Host "Successfully replaced performance section"
    Write-Host "Old section had" $oldCount "lines"
    Write-Host "New section has" $replacementLines.Count "lines"
} else {
    Write-Host "ERROR: Could not find performance section boundaries"
}
