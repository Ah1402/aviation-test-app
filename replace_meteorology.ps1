# Replace meteorology section in testData.js
$dataFile = "src\data\testData.js"
$replacementFile = "meteorology_new.txt"

Write-Host "Reading files..."
$lines = Get-Content $dataFile
$replacementLines = Get-Content $replacementFile

# Find start and end of meteorology section
$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s*"metrology":\s*\{') {
        $startLine = $i
        Write-Host "Found meteorology start at line" ($i + 1)
    }
    if ($startLine -ge 0 -and $lines[$i] -match '^\s*"mass-balance":\s*\{') {
        $endLine = $i - 1
        Write-Host "Found meteorology end at line" ($i)
        break
    }
}

if ($startLine -ge 0 -and $endLine -ge 0) {
    Write-Host "Replacing lines" ($startLine + 1) "to" ($endLine + 1)
    
    # Build new content
    $newLines = @()
    if ($startLine -gt 0) {
        $newLines += $lines[0..($startLine - 1)]  # Before meteorology
    }
    $newLines += $replacementLines             # New meteorology section
    $newLines += $lines[$endLine..$($lines.Count - 1)]  # After meteorology
    
    # Write to file
    Write-Host "Writing updated file..."
    $newLines | Set-Content $dataFile
    
    $oldCount = $endLine - $startLine + 1
    Write-Host "Successfully replaced meteorology section"
    Write-Host "Old section had" $oldCount "lines"
    Write-Host "New section has" $replacementLines.Count "lines"
    Write-Host "Total file now has" $newLines.Count "lines"
} else {
    Write-Host "ERROR: Could not find meteorology section boundaries"
    Write-Host "Start:" $startLine "End:" $endLine
}
