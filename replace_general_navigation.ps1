# Replace General Navigation section in testData.js

$testDataPath = "src\data\testData.js"
$newContentPath = "general_navigation_new.txt"

# Read files
$content = Get-Content -Path $testDataPath -Raw
$newGeneralNavigation = Get-Content -Path $newContentPath -Raw

# Find start of general-navigation section
$pattern = '"general-navigation":\s*\{'
$match = [regex]::Match($content, $pattern)

if ($match.Success) {
    $startIndex = $match.Index
    
    # Find the closing brace of general-navigation section
    $braceCount = 0
    $inSection = $false
    $endIndex = $startIndex
    
    for ($i = $startIndex; $i -lt $content.Length; $i++) {
        $char = $content[$i]
        
        if ($char -eq '{') {
            $braceCount++
            $inSection = $true
        }
        elseif ($char -eq '}') {
            $braceCount--
            if ($inSection -and $braceCount -eq 0) {
                $endIndex = $i + 1
                break
            }
        }
    }
    
    # Replace the section
    $before = $content.Substring(0, $startIndex)
    $after = $content.Substring($endIndex)
    
    $newContent = $before + $newGeneralNavigation.TrimEnd() + $after
    
    # Write back
    Set-Content -Path $testDataPath -Value $newContent -NoNewline
    
    Write-Host "General Navigation section replaced successfully!"
    Write-Host "Section started at position: $startIndex"
    Write-Host "Section ended at position: $endIndex"
} else {
    Write-Host "Could not find general-navigation section!"
}
