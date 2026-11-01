@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js 20+ required. & pause & exit /b 1)
call npm install --no-audit --no-fund || (echo Dependency installation failed. & pause & exit /b 1)
call npm run build || (echo Build or verification failed. & pause & exit /b 1)
echo.
echo READY: dist\index.html and dist\operator-manual.html
pause
