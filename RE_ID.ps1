param(
  [string]$TestDataPath = (Resolve-Path './testData_complete.js'),
  [string]$HtmlPath = (Resolve-Path './924.html'),
  [string]$IndexPath = (Resolve-Path './index.html'),
  [string]$BackupTD = (Join-Path (Split-Path $TestDataPath -Parent) 'testData_complete.js.bak.reid'),
  [string]$Backup924 = (Join-Path (Split-Path $HtmlPath -Parent) '924.html.bak.reid'),
  [string]$BackupIndex = (Join-Path (Split-Path $IndexPath -Parent) 'index.html.bak.reid')
)

function Read-File([string]$path){ if(!(Test-Path $path)){ throw "File not found: $path" }; [System.IO.File]::ReadAllText($path) }
function Write-File([string]$path, [string]$content){ [System.IO.File]::WriteAllText($path, $content) }

function ConvertTo-NormalizedText([string]$s){ if($null -eq $s){ return '' }; ($s -replace '\r?\n',' ' -replace '\s+',' ').Trim() }

# Compute stable IDs by hashing question text
function ComputeId([string]$text){
  $norm = ConvertTo-NormalizedText $text
  $sha = [System.Security.Cryptography.SHA1]::Create()
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($norm)
  $hash = $sha.ComputeHash($bytes)
  $num = [BitConverter]::ToString($hash).Replace('-','').Substring(0,8)
  # Convert hex to int and mod into range 1..9999
  $val = [Convert]::ToInt32($num,16)
  ($val % 9000) + 1000
}

function ReIdTestData([string]$content){
  $pattern = '(?ms)"id"\s*:\s*(\d+)\s*,\s*\n\s*"question"\s*:\s*"([^"]+)"'
  $new = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, {
    param($m)
    $q = $m.Groups[2].Value
    $newId = ComputeId $q
    # Recreate the "id": <num>,\n            "question": "..." sequence
    $idPart = '"id": ' + $newId + ','
    $qPart = "`n            `"question`": `"$q`""
    return $idPart + $qPart
  })
  $new
}

function ReIdHtml([string]$content){
  $pattern = '(?ms)(id\s*=\s*"?)(\d+)("?[^>]*>\s*[^<]{0,200})'
  $new = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, {
    param($m)
    $prefix = $m.Groups[1].Value
    # derive new ID from nearby text
    $trail = $m.Groups[3].Value
    # Try to extract nearby question text to hash
    $textMatch = [System.Text.RegularExpressions.Regex]::Match($trail,'>([^<]{10,200})')
    $q = if($textMatch.Success){ $textMatch.Groups[1].Value } else { $trail }
    $newId = ComputeId $q
    return $prefix + $newId + $trail
  })
  $new
}

try{
  $td = Read-File $TestDataPath
  $html = Read-File $HtmlPath
  $index = Read-File $IndexPath
  Write-File $BackupTD $td
  Write-File $Backup924 $html
  Write-File $BackupIndex $index
  Write-Host "Re-indexing IDs in testData_complete.js, 924.html and index.html..."
  $newTd = ReIdTestData $td
  $newHtml = ReIdHtml $html
  $newIndex = ReIdTestData $index
  if($newTd -ne $td){ Write-File $TestDataPath $newTd; Write-Host "testData_complete.js IDs updated" } else { Write-Host "No changes in testData_complete.js" }
  if($newHtml -ne $html){ Write-File $HtmlPath $newHtml; Write-Host "924.html IDs updated" } else { Write-Host "No changes in 924.html" }
  if($newIndex -ne $index){ Write-File $IndexPath $newIndex; Write-Host "index.html IDs updated" } else { Write-Host "No changes in index.html" }
}
catch{ Write-Error $_; exit 1 }