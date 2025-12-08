# Replace mass-balance section in testData.js
$dataFile = "src\data\testData.js"
$replacementFile = "mass_balance_new.txt"

Write-Host "Reading files..."
$lines = Get-Content $dataFile
$replacementLines = Get-Content $replacementFile

# Find start of mass-balance section (it's the last section before closing brace)
$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s*"mass-balance":\s*\{') {
        $startLine = $i
        Write-Host "Found mass-balance start at line" ($i + 1)
    }
    # Look for the closing of the testData object (last section)
    if ($startLine -ge 0 -and $lines[$i] -match '^\}$' -and $i -gt $startLine + 10) {
        $endLine = $i - 1
        Write-Host "Found mass-balance end at line" ($i)
        break
    }
}

if ($startLine -ge 0 -and $endLine -ge 0) {
    Write-Host "Replacing lines" ($startLine + 1) "to" ($endLine + 1)
    
    # Build new content
    $newLines = @()
    if ($startLine -gt 0) {
        $newLines += $lines[0..($startLine - 1)]  # Before mass-balance
    }
    $newLines += $replacementLines             # New mass-balance section
    $newLines += $lines[$endLine..$($lines.Count - 1)]  # After mass-balance (closing brace and exports)
    
    # Write to file
    Write-Host "Writing updated file..."
    $newLines | Set-Content $dataFile
    
    $oldCount = $endLine - $startLine + 1
    Write-Host "Successfully replaced mass-balance section"
    Write-Host "Old section had" $oldCount "lines"
    Write-Host "New section has" $replacementLines.Count "lines"
    Write-Host "Total file now has" $newLines.Count "lines"
} else {
    Write-Host "ERROR: Could not find mass-balance section boundaries"
    Write-Host "Start:" $startLine "End:" $endLine
}
