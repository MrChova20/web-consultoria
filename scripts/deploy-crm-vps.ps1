# Despliega el CRM (crm-calendario-clinica) al VPS y lo deja listo para subdominio.
# Uso: desde la raíz del proyecto web-consultoria: .\scripts\deploy-crm-vps.ps1
# Si ~/apps/web-consultoria no existe en el VPS, se clona el repo desde GitHub.

$ErrorActionPreference = "Stop"
$VPS = "ubuntu@137.74.115.81"
$KEY = "$env:USERPROFILE\.ssh\id_ed25519_pablo"
$RepoUrl = "https://github.com/MrChova20/web-consultoria.git"

Write-Host "==> Comprobando repo en el VPS..." -ForegroundColor Cyan
$setup = @"
mkdir -p ~/apps
if [ ! -d ~/apps/web-consultoria/.git ]; then
  git clone $RepoUrl ~/apps/web-consultoria
fi
cd ~/apps/web-consultoria && git fetch origin main && git reset --hard origin/main
"@
ssh -i $KEY -o StrictHostKeyChecking=no $VPS $setup

Write-Host "==> Instalando dependencias y arrancando CRM con PM2..." -ForegroundColor Cyan
$commands = @"
cd ~/apps/web-consultoria/crm-calendario-clinica && \
([ -f .env ] || cp .env.example .env) && \
npm ci --omit=dev 2>/dev/null || npm install --omit=dev && \
(pm2 delete crm-calendario 2>/dev/null; true) && \
PORT=4001 pm2 start server.js --name crm-calendario && \
pm2 save
"@
ssh -i $KEY -o StrictHostKeyChecking=no $VPS $commands

Write-Host ""
Write-Host "CRM desplegado." -ForegroundColor Green
Write-Host "  Acceso por IP: http://137.74.115.81:4001" -ForegroundColor Green
Write-Host "  (Si no conecta, en el VPS: sudo ufw allow 4001/tcp && sudo ufw reload)" -ForegroundColor Gray
Write-Host ""
Write-Host "Para activar subdominio crm.gandiasoftware.com (en el VPS):" -ForegroundColor Yellow
Write-Host "  1. DNS: registro A de crm.gandiasoftware.com -> 137.74.115.81" -ForegroundColor Gray
Write-Host "  2. cd ~/apps/web-consultoria && sudo cp scripts/nginx-crm-gandiasoftware.conf /etc/nginx/sites-available/crm.gandiasoftware.com" -ForegroundColor Gray
Write-Host "  3. sudo ln -sf /etc/nginx/sites-available/crm.gandiasoftware.com /etc/nginx/sites-enabled/" -ForegroundColor Gray
Write-Host "  4. sudo nginx -t && sudo systemctl reload nginx" -ForegroundColor Gray
Write-Host ""
Write-Host "Logs del CRM: ssh -i ... ubuntu@137.74.115.81 'pm2 logs crm-calendario'" -ForegroundColor Gray
