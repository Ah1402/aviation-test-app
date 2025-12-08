# PowerShell script to replace human-performance section in testData.js

$testDataFile = "src\data\testData.js"
$newContentFile = "human_performance_new.txt"

Write-Host "Reading files..."
$testDataLines = Get-Content $testDataFile
$newContent = Get-Content $newContentFile

Write-Host "Total lines in testData.js: $($testDataLines.Count)"
Write-Host "Total lines in new content: $($newContent.Count)"

# Find the start of human-performance section
$startLine = -1
for ($i = 0; $i -lt $testDataLines.Count; $i++) {
    if ($testDataLines[$i] -match '^\s*"human-performance":\s*\{') {
        $startLine = $i
        Write-Host "Found human-performance start at line $($i + 1)"
        break
    }
}

if ($startLine -eq -1) {
    Write-Host "ERROR: Could not find human-performance section start"
    exit 1
}

# Find the end of human-performance section (next closing brace before next major section)
$endLine = -1
$braceCount = 0
$foundStart = $false

for ($i = $startLine; $i -lt $testDataLines.Count; $i++) {
    $line = $testDataLines[$i]
    
    # Count opening braces
    $openBraces = ($line.ToCharArray() | Where-Object { $_ -eq '{' }).Count
    $closeBraces = ($line.ToCharArray() | Where-Object { $_ -eq '}' }).Count
    
    if ($i -eq $startLine) {
        $braceCount = $openBraces
        $foundStart = $true
    } else {
        $braceCount += $openBraces - $closeBraces
    }
    
    # When brace count returns to 0, we've found the end of human-performance section
    if ($foundStart -and $braceCount -eq 0 -and $line -match '^\s*\}') {
        $endLine = $i
        Write-Host "Found human-performance end at line $($i + 1)"
        break
    }
}

if ($endLine -eq -1) {
    Write-Host "ERROR: Could not find human-performance section end"
    exit 1
}

# Build the new file
Write-Host "Building new file..."
$newFile = @()

# Add lines before human-performance section
for ($i = 0; $i -lt $startLine; $i++) {
    $newFile += $testDataLines[$i]
}

# Add new human-performance content
$newFile += $newContent

# Add lines after human-performance section
for ($i = $endLine + 1; $i -lt $testDataLines.Count; $i++) {
    $newFile += $testDataLines[$i]
}

# Write the new file
Write-Host "Writing updated testData.js..."
$newFile | Set-Content $testDataFile -Encoding UTF8

Write-Host ""
Write-Host "SUCCESS: Replaced human-performance section"
Write-Host "Old section: $($endLine - $startLine + 1) lines"
Write-Host "New section: $($newContent.Count) lines"
Write-Host "Total file now: $($newFile.Count) lines"
