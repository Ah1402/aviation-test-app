# Restore plane icon in header while keeping logo.jpg as favicon
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
        
        # Pattern to match the embedded logo image tag with fallback
        $pattern = '<img src="data:image/jpeg;base64,[^"]*" alt="Aviation Logo"[^>]*>\s*<span class="logo-fallback"[^>]*>✈️</span>'
        
        # Replace with plane icon
        $replacement = '<i class="fas fa-plane-departure"></i>'
        
        $content = $content -replace $pattern, $replacement
        
        [System.IO.File]::WriteAllText($file, $content)
        Write-Host "  Updated - plane icon restored"
    }
}

Write-Host " "
Write-Host "Plane icon restored in all files!"
Write-Host "Logo.jpg remains as favicon/app icon"
