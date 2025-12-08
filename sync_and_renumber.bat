@echo off
REM Workspace-level wrapper for tools/sync_and_renumber.js
REM Interactive behaviour: if run with no arguments this script will prompt
REM the user whether they want to 'sync', 'renumber' or 'both' and will ask
REM for targets and whether to actually apply changes (dry-run by default).

SETLOCAL ENABLEDELAYEDEXPANSION

:: Resolve the script directory so the JS is found relative to this file
SET SCRIPT_DIR=%~dp0
SET NODE_CMD=node

IF NOT EXIST "%SCRIPT_DIR%tools\sync_and_renumber.js" (
  echo ERROR: tools\sync_and_renumber.js not found relative to %SCRIPT_DIR%
  goto :eof
)

:: If arguments are provided, forward them directly to the node script
IF NOT "%~1"=="" (
  "%NODE_CMD%" "%SCRIPT_DIR%tools\sync_and_renumber.js" %*
  ENDLOCAL
  goto :eof
)

:: Interactive mode
echo === sync_and_renumber (interactive) ===
echo Default canonical source is: testData_complete.js
set /p SOURCE=Enter canonical source file (press Enter for default):
if "%SOURCE%"=="" set SOURCE=testData_complete.js

echo Default targets: src/data/testData_complete.js,924.html
set /p TARGETS=Enter comma-separated target files (press Enter for default):
if "%TARGETS%"=="" set TARGETS=src/data/testData_complete.js,924.html

echo Choose an action:
echo  1) Sync only (copy IDs from canonical to targets)
echo  2) Renumber only (renumber canonical file sequentially)
echo  3) Both (renumber canonical and apply mapping to targets)
set /p ACTION=Select 1/2/3 (default 3):
if "%ACTION%"=="" set ACTION=3

set RENARG=
set TARGETSARG=

if "%ACTION%"=="1" (
  rem Sync only
  set RENARG=
  set TARGETSARG=--targets %TARGETS%
) else if "%ACTION%"=="2" (
  rem Renumber only
  set RENARG=--renumber
  set TARGETSARG=
) else (
  rem Both
  set RENARG=--renumber
  set TARGETSARG=--targets %TARGETS%
)

set /p APPLYCHOICE=Apply changes now? (y/N) :
if /I "%APPLYCHOICE%"=="y" set APPLY=--apply

set /p BACKUPCHOICE=Create backups before applying? (Y/n) :
if /I "%BACKUPCHOICE%"=="n" set NOBACKUP=--no-backup

set CMD="%NODE_CMD%" "%SCRIPT_DIR%tools\sync_and_renumber.js" --source %SOURCE% %TARGETSARG% %RENARG% %APPLY% %NOBACKUP%
echo
echo Running: %CMD%
%CMD%

ENDLOCAL
