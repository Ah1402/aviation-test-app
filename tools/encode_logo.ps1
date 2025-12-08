$in = 'C:\Users\ahmed\Desktop\aviation-test-app\src\images\logo.jpg'
$out = 'C:\Users\ahmed\Desktop\aviation-test-app\logo_b64.txt'
$b = [System.IO.File]::ReadAllBytes($in)
$base64 = [System.Convert]::ToBase64String($b)
[System.IO.File]::WriteAllText($out, $base64)
Write-Host "Wrote base64 to $out (" ([System.IO.File]::ReadAllText($out).Length) " chars)"