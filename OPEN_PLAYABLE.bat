@echo off
setlocal
set "DIR=%~dp0"
set "HTML=%DIR%index.html"

if not exist "%HTML%" (
  echo Missing index.html next to this file.
  echo Expected: %HTML%
  pause
  exit /b 1
)

REM Unblock files downloaded/copied with Mark-of-the-Web (lets Edge/Chrome open them)
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-ChildItem -LiteralPath '%DIR%' -File | Unblock-File -ErrorAction SilentlyContinue" 2>nul

REM Try Chrome / Edge explicitly (Windows often has no default app for .html)
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
  start "" "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" "%HTML%"
  exit /b 0
)
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%HTML%"
  exit /b 0
)
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%HTML%"
  exit /b 0
)
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" "%HTML%"
  exit /b 0
)

REM Fallback: whatever Windows uses for .html
start "" "%HTML%"
exit /b 0
