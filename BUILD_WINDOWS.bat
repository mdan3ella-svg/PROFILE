@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Install Node.js LTS first from nodejs.org & pause & exit /b 1)
call npm install --no-audit --no-fund
if errorlevel 1 (echo Dependency install failed. Internet required for this initial setup. & pause & exit /b 1)
call npm run build
if errorlevel 1 (echo Build failed. & pause & exit /b 1)
echo Standalone file created: PROFILE_OFFLINE_STANDALONE.html
pause
