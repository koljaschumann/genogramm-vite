@echo off
echo.
echo ========================================
echo   Genogramm-Generator wird gestartet...
echo ========================================
echo.
echo Browser oeffnet sich automatisch unter:
echo http://localhost:5173
echo.
echo Zum Beenden: Dieses Fenster schliessen
echo ========================================
echo.

start http://localhost:5173
npm run dev

pause