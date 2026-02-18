# Despliega web-consultoria al VPS 137.74.115.81
# Uso: desde la raíz del proyecto: .\scripts\deploy-to-vps.ps1
# Requiere: haber configurado .env en backend (o crearlo en el VPS)

$ErrorActionPreference = "Stop"
$VPS = "ubuntu@137.74.115.81"
$KEY = "$env:USERPROFILE\.ssh\id_ed25519_pablo"

$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $Root

Write-Host "==> Build local (frontend + backend)..." -ForegroundColor Cyan
# Frontend
Set-Location frontend
npm ci 2>$null; if (-not $?) { npm install }
npm run build
Set-Location $Root

New-Item -ItemType Directory -Force -Path backend\public | Out-Null
Copy-Item -Recurse -Force frontend\dist\* backend\public\

# Backend
Set-Location backend
npm ci 2>$null; if (-not $?) { npm install }
npm run build
Set-Location $Root

Write-Host "==> Subiendo backend al VPS..." -ForegroundColor Cyan
scp -i $KEY -o StrictHostKeyChecking=no -r backend ${VPS}:~/backend-deploy

Write-Host "==> En el VPS: instalando e iniciando..." -ForegroundColor Cyan
$Commands = "cd ~/backend-deploy && npm ci --omit=dev && (pm2 delete web-consultoria 2>/dev/null; true) && NODE_ENV=production PORT=4000 pm2 start dist/server.js --name web-consultoria && pm2 save"
ssh -i $KEY -o StrictHostKeyChecking=no $VPS $Commands

Write-Host ""
Write-Host "Listo. Web en: http://137.74.115.81:4000" -ForegroundColor Green
Write-Host "Logs en el VPS: ssh ... pm2 logs web-consultoria" -ForegroundColor Gray
