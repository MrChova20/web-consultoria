#!/bin/bash
# Despliegue en VPS: build frontend + backend y deja listo para ejecutar en un puerto
# Uso: ./scripts/deploy-vps.sh
# Luego en el VPS: PORT=4000 node backend/dist/server.js (o usar PM2)

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Instalando dependencias del frontend..."
cd frontend && npm ci && cd "$ROOT"

echo "==> Instalando dependencias del backend..."
cd backend && npm ci && cd "$ROOT"

echo "==> Build del frontend (Vite)..."
cd frontend && npm run build && cd "$ROOT"

echo "==> Copiando frontend build a backend/public..."
mkdir -p backend/public
cp -r frontend/dist/* backend/public/

echo "==> Build del backend (TypeScript)..."
cd backend && npm run build && cd "$ROOT"

echo "==> Listo. Para ejecutar en el VPS:"
echo "    cd backend && NODE_ENV=production PORT=4000 npm start"
echo ""
echo "O con PM2 (recomendado):"
echo "    cd backend && NODE_ENV=production PORT=4000 pm2 start dist/server.js --name web-consultoria"
echo "    pm2 save && pm2 startup"
