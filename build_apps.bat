@echo off
REM Aviation Test App Auto-Builder
REM Automatically rebuilds APK and IPA when testData_complete.js changes

echo ========================================
echo   Aviation Test App Auto-Builder
echo ========================================
echo.

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if testData_complete.js exists
if not exist "testData_complete.js" (
    echo ❌ testData_complete.js not found in current directory
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo ✅ Environment check passed
echo.

REM Get current timestamp for versioning
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set TIMESTAMP=%datetime:~0,8%_%datetime:~8,6%

REM Update version number in testData_complete.js
echo 📝 Updating version number...
node scripts/update_version.js
if %errorlevel% neq 0 (
    echo ❌ Version update failed
    pause
    exit /b 1
)
echo ✅ Version updated
echo.

REM Copy testData_complete.js to www directory for mobile builds
echo 📋 Preparing web assets...
if not exist "www" mkdir www
copy "testData_complete.js" "www\" >nul 2>&1
copy "index.html" "www\" >nul 2>&1
copy "manifest.json" "www\" >nul 2>&1
copy "sw.js" "www\" >nul 2>&1
copy "ahmed.png" "www\" >nul 2>&1
echo ✅ Web assets prepared
echo.

REM Build APK
echo 📱 Building Android APK...
call npm run build:direct-install
if %errorlevel% neq 0 (
    echo ❌ APK build failed
    pause
    exit /b 1
)
echo ✅ APK built successfully
echo.

REM Rename files with timestamp for version control
if exist "Aviation-Test-App.apk" (
    move "Aviation-Test-App.apk" "Aviation-Test-App_%TIMESTAMP%.apk" >nul 2>&1
    echo 📦 APK renamed to: Aviation-Test-App_%TIMESTAMP%.apk
)

if exist "Aviation-Test-App.ipa" (
    move "Aviation-Test-App.ipa" "Aviation-Test-App_%TIMESTAMP%.ipa" >nul 2>&1
    echo 📦 IPA renamed to: Aviation-Test-App_%TIMESTAMP%.ipa
)

REM Create latest symlinks/ copies for easy sharing
if exist "Aviation-Test-App_%TIMESTAMP%.apk" (
    copy "Aviation-Test-App_%TIMESTAMP%.apk" "Aviation-Test-App_LATEST.apk" >nul 2>&1
    echo 🔗 Latest APK: Aviation-Test-App_LATEST.apk
)

if exist "Aviation-Test-App_%TIMESTAMP%.ipa" (
    copy "Aviation-Test-App_%TIMESTAMP%.ipa" "Aviation-Test-App_LATEST.ipa" >nul 2>&1
    echo 🔗 Latest IPA: Aviation-Test-App_LATEST.ipa
)

echo.
echo ========================================
echo         BUILD COMPLETE!
echo ========================================
echo.
echo 📁 Files created in: %CD%
echo.
echo 📱 Android APK:
echo    Latest: Aviation-Test-App_LATEST.apk
if exist "Aviation-Test-App_%TIMESTAMP%.apk" echo    Version: Aviation-Test-App_%TIMESTAMP%.apk
echo.
echo 🍎 iOS IPA:
echo    Latest: Aviation-Test-App_LATEST.ipa
if exist "Aviation-Test-App_%TIMESTAMP%.ipa" echo    Version: Aviation-Test-App_%TIMESTAMP%.ipa
echo.
echo 📤 Sharing Instructions:
echo 1. Share the LATEST files for current users
echo 2. Keep timestamped files for version history
echo 3. Users can install by tapping the files directly
echo.
echo 🎯 Next: Share these files with your users!
echo.

REM Wait for user to see results
pause