param(
  [string]$IndexPath = (Resolve-Path './index.html'),
  [string]$TestDataPath = (Resolve-Path './testData_complete.js'),
  [string]$BackupPath = (Join-Path (Split-Path $IndexPath -Parent) 'index.html.bak.sync')
)

function Read-File([string]$path){
  if(!(Test-Path $path)){ throw "File not found: $path" }
  [System.IO.File]::ReadAllText($path)
}

function Convert-Text([string]$s){
  if($null -eq $s){ return '' }
  $t = $s -replace '\r?\n',' ' -replace '\s+',' ' -replace '\s*,\s*', ', ' -replace '\s*°\s*','°'
  $t = $t -replace '\+/-','±' -replace 'x','×'
  $t.Trim()
}

function Get-QuestionsFromTestData([string]$js){
  $items = @()
  $pattern = '(?ms)"question"\s*:\s*"((?:[^"\\]|\\.)+)"'
  foreach($m in [System.Text.RegularExpressions.Regex]::Matches($js,$pattern)){
    $raw = $m.Groups[1].Value
    $unescaped = ($raw -replace '\\"','"' -replace '\\n',' ' -replace '\\r',' ')
    $q = Convert-Text($unescaped)
    if($q.Length -gt 5){ $items += $q }
  }
  $items
}

function UpdateIndexFrom924([string]$indexContent, [string[]]$qList){
  $updated = $indexContent
  foreach($q in $qList){
    $nq = $q
    $updated = $updated -replace [System.Text.RegularExpressions.Regex]::Escape($q), $nq
  }
  $updated
}

try{
  Write-Host "Reading files..."
  $indexContent = Read-File $IndexPath
  $srcContent = Read-File $TestDataPath

  Write-Host "Extracting questions from testData_complete.js..."
  $qs = Get-QuestionsFromTestData $srcContent
  if($qs.Count -eq 0){ Write-Warning "No questions extracted from testData_complete.js. Tool performed no changes."; exit 0 }

  Write-Host "Creating backup at $BackupPath"
  [System.IO.File]::WriteAllText($BackupPath, $indexContent)

  Write-Host "Updating index.html content..."
  $newContent = UpdateIndexFrom924 $indexContent $qs

  if($newContent -ne $indexContent){
    [System.IO.File]::WriteAllText($IndexPath, $newContent)
    Write-Host "index.html updated using content from testData_complete.js"
  } else {
    Write-Host "No changes were necessary. index.html already aligned."
  }
}
catch{
  Write-Error $_
  exit 1
}