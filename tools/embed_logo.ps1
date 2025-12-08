# Read the base64 encoded logo
$base64 = [System.IO.File]::ReadAllText('C:\Users\ahmed\Desktop\aviation-test-app\logo_b64.txt')
$dataUri = "data:image/jpeg;base64,$base64"

# Files to update
$files = @(
    'C:\Users\ahmed\Desktop\aviation-test-app\index.html',
    'C:\Users\ahmed\Desktop\aviation-test-app\www\index.html',
    'C:\Users\ahmed\Desktop\aviation-test-app\dist\portable_build\index.html',
    'C:\Users\ahmed\Desktop\aviation-test-app\dist\portable_build\www\index.html'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating: $file"
        $content = [System.IO.File]::ReadAllText($file)
        
        # Replace src="src/images/logo.jpg" with the data URI
        $content = $content -replace 'src="src/images/logo\.jpg"', ('src="' + $dataUri + '"')
        
        [System.IO.File]::WriteAllText($file, $content)
        Write-Host "  ✓ Updated"
    }
}

Write-Host ""
Write-Host "Logo embedded successfully in all files!"
