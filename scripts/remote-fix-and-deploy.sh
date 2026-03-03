#!/bin/bash
set -e
. ~/.nvm/nvm.sh 2>/dev/null; nvm use 20 2>/dev/null || true
cd ~/apps/web-consultoria
sed -i '/^  Check,$/d' frontend/src/App.tsx
cd frontend && npm run build && cd ..
mkdir -p backend/public && cp -r frontend/dist/* backend/public/
cd backend && npm install jsonwebtoken @types/jsonwebtoken --save 2>/dev/null || true
chmod -R u+x node_modules/.bin 2>/dev/null || true
node node_modules/typescript/bin/tsc
PORT=4000
if [ -f .env ]; then
  (grep -v '^PORT=' .env; echo "PORT=$PORT") > .env.tmp && mv .env.tmp .env
else
  echo "NODE_ENV=production" > .env
  echo "PORT=$PORT" >> .env
fi
pm2 delete web-consultoria 2>/dev/null || true
NODE_ENV=production PORT=$PORT pm2 start dist/server.js --name web-consultoria
pm2 save
IP=$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
echo ""
echo "=== Despliegue listo ==="
echo "Front/API: http://${IP}:${PORT}"
echo "Health:   http://${IP}:${PORT}/api/health"
