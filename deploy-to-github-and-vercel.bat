@echo off
chcp 65001 >nul
echo ====================================================================
echo   SmartMacroCalc.com - Automated GitHub & Vercel Deployment Tool
echo ====================================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [1/4] Git не е открит. Инсталиране на Git чрез Winget...
    winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
    set "PATH=%PATH%;C:\Program Files\Git\cmd"
)

where gh >nul 2>nul
if %errorlevel% neq 0 (
    echo [2/4] Инсталиране на GitHub CLI (gh) чрез Winget...
    winget install --id GitHub.cli -e --source winget --accept-package-agreements --accept-source-agreements
    set "PATH=%PATH%;C:\Program Files\GitHub CLI"
)

echo.
echo [3/4] Инициализиране на Git хранилище и качване в GitHub...
if not exist ".git" (
    git init
    git branch -M main
)
git add .
git commit -m "Production release: SmartMacroCalc.com (6 calculators, 64 pSEO pages, GEO/AEO, AdSense & Security)"

echo.
echo Влезте във вашия GitHub акаунт в браузъра, ако бъдете подканени:
gh auth status >nul 2>nul || gh auth login --web
gh repo create smartmacrocalc --public --source=. --remote=origin --push

echo.
echo [4/4] Публикуване във Vercel (ще се отвори браузър за вход във Vercel)...
call npx.cmd vercel --prod

echo.
echo ====================================================================
echo   ГОТОВО! Сайтът е качен в GitHub и публикуван във Vercel!
echo ====================================================================
pause
