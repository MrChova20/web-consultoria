# Clona https://github.com/MrChova20/web-consultoria en ~/apps/web-consultoria del VPS
# y despliega en un puerto libre. Uso: .\scripts\deploy-from-github-vps.ps1
# Requiere: clave SSH (id_ed25519_pablo), Node.js y PM2 en el VPS.

$ErrorActionPreference = "Stop"
$VPS = "ubuntu@137.74.115.81"
$KEY = "$env:USERPROFILE\.ssh\id_ed25519_pablo"
$ScriptPath = Join-Path $PSScriptRoot "setup-and-deploy-vps.sh"

if (-not (Test-Path $ScriptPath)) {
    Write-Host "No se encuentra scripts/setup-and-deploy-vps.sh" -ForegroundColor Red
    exit 1
}

Write-Host "==> Enviando script al VPS y ejecutando (clone + build + PM2 en puerto libre)..." -ForegroundColor Cyan
Get-Content $ScriptPath -Raw | ssh -i $KEY -o StrictHostKeyChecking=no $VPS 'bash -s'

Write-Host ""
Write-Host "Si usas otro host (ej. IP), edita la variable `$VPS en este script o ejecuta:" -ForegroundColor Gray
Write-Host "  Get-Content .\scripts\setup-and-deploy-vps.sh -Raw | ssh -i `$env:USERPROFILE\.ssh\id_ed25519_pablo ubuntu@TU_IP 'bash -s'" -ForegroundColor Gray
