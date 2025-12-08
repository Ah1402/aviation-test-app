# Read the files
$testDataPath = "src\data\testData.js"
$replacementPath = "performance_replacement.txt"

# Read all content
$content = Get-Content $testDataPath -Raw
$replacement = Get-Content $replacementPath -Raw

# Find the start and end markers
$startPattern = '  },\s*"performance": \{'
$endPattern = '  \},\s*"general-navigation": \{'

# Use regex to find and replace
$regex = "($startPattern)(.*?)(\s*\},\s*""general-navigation"")"
$newContent = $content -replace $regex, "`$1`n$replacement`n  },`n  ""general-navigation""", "Singleline"

# Write back
Set-Content -Path $testDataPath -Value $newContent -NoNewline

Write-Host "Performance section replaced successfully!"
