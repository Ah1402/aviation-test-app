@echo off
REM Aviation Test App - Main Menu
REM All-in-one tool for managing your aviation test application

:MENU
cls
echo ================================================================================
echo                   AVIATION TEST APP - MANAGEMENT TOOL
echo ================================================================================
echo.
echo  Please select an option:
echo.
echo  [1] Renumber Question IDs
echo      - Renumber all question IDs sequentially (1, 2, 3...)
echo.
echo  [2] Sync to 924.html Only
echo      - Sync testData_complete.js to 924.html only
echo.
echo  [3] Sync to Index and 924
echo      - Sync testData_complete.js to both index.html and 924.html
echo.
echo  [4] Sync and Deploy
echo      - Sync testData to index.html and 924.html, then push to GitHub
echo.
echo  [5] Backup Files
echo      - Create backup of testData_complete.js, index.html, and 924.html
echo.
echo  [6] Renumber + Sync
echo      - Renumber IDs, then sync to index.html and 924.html
echo.
echo  [7] Renumber + Sync + Deploy
echo      - Renumber IDs, sync to all files, and deploy to GitHub
echo.
echo  [8] Backup + Renumber + Sync + Deploy
echo      - Full workflow: Backup, Renumber, Sync, Deploy
echo.
echo  [0] Exit
echo.
echo ================================================================================
echo.

set /p choice="Enter your choice (0-8): "

if "%choice%"=="1" goto RENUMBER
if "%choice%"=="2" goto SYNC924_ONLY
if "%choice%"=="3" goto SYNC_ALL
if "%choice%"=="4" goto SYNCDEPLOY
if "%choice%"=="5" goto BACKUP
if "%choice%"=="6" goto RENUMBER_SYNC
if "%choice%"=="7" goto RENUMBER_SYNCDEPLOY
if "%choice%"=="8" goto FULL_WORKFLOW
if "%choice%"=="0" goto EXIT

echo Invalid choice. Please try again.
timeout /t 2 >nul
goto MENU

:RENUMBER
echo.
echo ================================================================================
echo  RENUMBER QUESTION IDs
echo ================================================================================
echo.
python renumber_ids.py
if errorlevel 1 (
    echo.
    echo ERROR: Renumbering failed!
    pause
    goto MENU
)
echo.
echo SUCCESS: All question IDs renumbered!
pause
goto MENU

:SYNC924_ONLY
echo.
echo ================================================================================
echo  SYNC TO 924.html ONLY
echo ================================================================================
echo.
echo Syncing testData_complete.js to 924.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"
if errorlevel 1 (
    echo.
    echo ERROR: Sync to 924.html failed!
    pause
    goto MENU
)
echo.
echo SUCCESS: testData synced to 924.html
pause
goto MENU

:SYNC_ALL
echo.
echo ================================================================================
echo  SYNC TO INDEX.HTML AND 924.HTML
echo ================================================================================
echo.
echo [Step 1/2] Syncing testData_complete.js to index.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -SkipDeploy
if errorlevel 1 (
    echo ERROR: Sync to index.html failed!
    pause
    goto MENU
)

echo.
echo [Step 2/2] Syncing testData_complete.js to 924.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"
if errorlevel 1 (
    echo ERROR: Sync to 924.html failed!
    pause
    goto MENU
)

echo.
echo SUCCESS: testData synced to both index.html and 924.html!
pause
goto MENU

:SYNCDEPLOY
echo.
echo ================================================================================
echo  SYNC AND DEPLOY
echo ================================================================================
echo.
echo [Step 1/3] Syncing testData_complete.js to index.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -SkipDeploy
if errorlevel 1 (
    echo ERROR: Sync to index.html failed!
    pause
    goto MENU
)

echo.
echo [Step 2/3] Syncing testData_complete.js to 924.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"
if errorlevel 1 (
    echo ERROR: Sync to 924.html failed!
    pause
    goto MENU
)

echo.
echo [Step 3/3] Deploying to GitHub...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -DeployOnly
if errorlevel 1 (
    echo ERROR: GitHub deployment failed!
    pause
    goto MENU
)

echo.
echo SUCCESS: All files synced and deployed to GitHub!
goto MENU

:BACKUP
echo.
echo ================================================================================
echo  BACKUP FILES
echo ================================================================================
echo.
set timestamp=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

echo Creating backups...
copy /Y testData_complete.js "backups\testData_complete_%timestamp%.js"
copy /Y index.html "backups\index_%timestamp%.html"
if exist 924.html copy /Y 924.html "backups\924_%timestamp%.html"

if errorlevel 1 (
    echo.
    echo ERROR: Backup failed!
    pause
    goto MENU
)

echo.
echo SUCCESS: Backups created in backups\ folder
echo   - testData_complete_%timestamp%.js
echo   - index_%timestamp%.html
if exist 924.html echo   - 924_%timestamp%.html
pause
goto MENU

:RENUMBER_SYNC
echo.
echo ================================================================================
echo  RENUMBER + SYNC 924
echo ================================================================================
echo.
echo [Step 1/2] Renumbering question IDs...
python renumber_ids.py
if errorlevel 1 (
    echo ERROR: Renumbering failed!
    pause
    goto MENU
)

echo.
echo [Step 2/2] Syncing from 924.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"
if errorlevel 1 (
    echo ERROR: Sync 924 failed!
    pause
    goto MENU
)

echo.
echo SUCCESS: Renumber + Sync 924 completed!
pause
goto MENU

:RENUMBER_SYNCDEPLOY
echo.
echo ================================================================================
echo  RENUMBER + SYNC + DEPLOY
echo ================================================================================
echo.
echo [Step 1/4] Renumbering question IDs...
python renumber_ids.py
if errorlevel 1 (
    echo ERROR: Renumbering failed!
    pause
    goto MENU
)

echo.
echo [Step 2/4] Syncing to index.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -SkipDeploy
if errorlevel 1 (
    echo ERROR: Sync to index.html failed!
    pause
    goto MENU
)

echo.
echo [Step 3/4] Syncing to 924.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"
if errorlevel 1 (
    echo ERROR: Sync to 924.html failed!
    pause
    goto MENU
)

echo.
echo [Step 4/4] Deploying to GitHub...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -DeployOnly
if errorlevel 1 (
    echo ERROR: GitHub deployment failed!
    pause
    goto MENU
)

echo.
echo SUCCESS: Renumber + Sync + Deploy completed!
pause
goto MENU

:FULL_WORKFLOW
echo.
echo ================================================================================
echo  FULL WORKFLOW: BACKUP + RENUMBER + SYNC + DEPLOY
echo ================================================================================
echo.

REM Step 1: Backup
echo [Step 1/5] Creating backups...
set timestamp=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

copy /Y testData_complete.js "backups\testData_complete_%timestamp%.js"
copy /Y index.html "backups\index_%timestamp%.html"
if exist 924.html copy /Y 924.html "backups\924_%timestamp%.html"

if errorlevel 1 (
    echo ERROR: Backup failed!
    pause
    goto MENU
)
echo SUCCESS: Backups created!

REM Step 2: Renumber
echo.
echo [Step 2/5] Renumbering question IDs...
python renumber_ids.py
if errorlevel 1 (
    echo ERROR: Renumbering failed!
    pause
    goto MENU
)
echo SUCCESS: Question IDs renumbered!

REM Step 3: Sync to index.html
echo.
echo [Step 3/5] Syncing testData to index.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -SkipDeploy
if errorlevel 1 (
    echo ERROR: Sync to index.html failed!
    pause
    goto MENU
)
echo SUCCESS: Synced to index.html!

REM Step 4: Sync to 924.html
echo.
echo [Step 4/5] Syncing testData to 924.html...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"
if errorlevel 1 (
    echo ERROR: Sync to 924.html failed!
    pause
    goto MENU
)
echo SUCCESS: Synced to 924.html!

REM Step 5: Deploy to GitHub
echo.
echo [Step 5/5] Deploying to GitHub...
powershell.exe -ExecutionPolicy Bypass -File "SYNC_AND_DEPLOY.ps1" -DeployOnly
if errorlevel 1 (
    echo ERROR: GitHub deployment failed!
    pause
    goto MENU
)

echo.
echo ================================================================================
echo  FULL WORKFLOW COMPLETED SUCCESSFULLY!
echo ================================================================================
echo.
echo All steps completed:
echo   [OK] Backup created
echo   [OK] Question IDs renumbered
echo   [OK] Synced to index.html
echo   [OK] Synced to 924.html
echo   [OK] Deployed to GitHub
echo.
pause
goto MENU

:EXIT
echo.
echo Exiting...
exit /b 0
