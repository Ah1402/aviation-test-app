# Replace Aircraft General section in testData.js

$testDataPath = "src\data\testData.js"
$newContentPath = "aircraft_general_new.txt"

$content = Get-Content -Path $testDataPath -Raw
$newSection = Get-Content -Path $newContentPath -Raw

$pattern = '"aircraft-general":\s*\{'
$match = [regex]::Match($content, $pattern)

if (-not $match.Success) {
    Write-Host "Could not find aircraft-general section!"
    exit 1
}

$startIndex = $match.Index
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

$before = $content.Substring(0, $startIndex)
$after = $content.Substring($endIndex)

$newContent = $before + $newSection.TrimEnd() + $after

Set-Content -Path $testDataPath -Value $newContent -NoNewline

Write-Host "Aircraft General section replaced successfully!"
Write-Host "Section started at position: $startIndex"
Write-Host "Section ended at position: $endIndex"