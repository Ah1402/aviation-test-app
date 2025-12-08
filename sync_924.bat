@echo off
echo Syncing testData_complete.js to 924.html...
powershell -Command "Get-Content 'testData_complete.js' | Select-Object -Skip 1 | Select-Object -SkipLast 1 | Out-File -FilePath 'temp_testdata.json' -Encoding UTF8"
powershell -Command "Get-Content 'temp_testdata.json' -Raw | ForEach-Object { '<script>window.testData = {' + $_ + '};</script>' } | Out-File -FilePath 'inline_script.txt' -Encoding UTF8"
powershell -Command "(Get-Content '924.html' -Raw) -replace '<script>window\.testData = \{[\s\S]*?\};</script>', (Get-Content 'inline_script.txt' -Raw) | Out-File -FilePath '924.html' -Encoding UTF8"
del temp_testdata.json
del inline_script.txt
echo Sync complete.