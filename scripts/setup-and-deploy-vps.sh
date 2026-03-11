#!/bin/bash
# Clona el repo en ~/apps/web-consultoria y despliega SIEMPRE en el puerto 4000 con PM2.
# Uso EN EL VPS: bash scripts/setup-and-deploy-vps.sh
# O desde fuera: ssh ubuntu@vps-d3220941 'bash -s' < scripts/setup-and-deploy-vps.sh
# (después de tener el repo en el VPS, desde la raíz: ./scripts/setup-and-deploy-vps.sh)
# Requiere Node.js 18+ en el VPS (recomendado: nvm install 18 && nvm use 18).

set -e
REPO_URL="https://github.com/MrChova20/web-consultoria.git"

# Usar Node 18+ si está disponible (nvm)
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
  nvm use 18 2>/dev/null || nvm use 20 2>/dev/null || nvm use default 2>/dev/null || true
fi
NODE_MAJOR=$(node -v 2>/dev/null | sed 's/v//;s/\..*//')
if [ -z "$NODE_MAJOR" ] || [ "$NODE_MAJOR" -lt 18 ] 2>/dev/null; then
  echo "ERROR: Se necesita Node.js 18 o superior. Actual: $(node -v 2>/dev/null || echo 'no encontrado')."
  echo "En el VPS ejecuta: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && . ~/.nvm/nvm.sh && nvm install 18 && nvm use 18"
  exit 1
fi
APPS_DIR="$HOME/apps"
PROJECT_DIR="$APPS_DIR/web-consultoria"
PORT=4000

# --- Llegar a ~/apps/web-consultoria ---
mkdir -p "$APPS_DIR"
if [ -d "$PROJECT_DIR/.git" ]; then
  echo "==> Actualizando repo en $PROJECT_DIR..."
  cd "$PROJECT_DIR"
  git fetch origin
  git reset --hard origin/main
  git pull --rebase origin main || true
else
  echo "==> Clonando $REPO_URL en $PROJECT_DIR..."
  if [ -d "$PROJECT_DIR" ]; then
    rm -rf "$PROJECT_DIR"
  fi
  git clone "$REPO_URL" "$PROJECT_DIR"
  cd "$PROJECT_DIR"
fi

echo "==> Directorio actual: $(pwd)"
# Asegurar que estamos en la raíz del proyecto
if [ ! -f "package.json" ] && [ -d "frontend" ]; then
  cd "$PROJECT_DIR"
fi

# --- Puerto fijo ---
echo "==> Usando puerto fijo: $PORT"

# --- Build ---
echo "==> Instalando dependencias frontend..."
cd frontend && npm ci 2>/dev/null || npm install
npm run build
cd ..

echo "==> Copiando frontend a backend/public..."
mkdir -p backend/public
cp -r frontend/dist/* backend/public/

echo "==> Instalando y compilando backend..."
cd backend
npm ci 2>/dev/null || npm install
npm run build

# --- .env ---
if [ ! -f .env ]; then
  echo "==> Creando backend/.env con PORT=$PORT"
  cat > .env << EOF
NODE_ENV=production
PORT=$PORT
# Ajusta correo y APPOINTMENT_EMAIL_TO según necesites
# MAIL_HOST=smtp.gmail.com
# MAIL_PORT=465
# MAIL_USER=
# MAIL_PASS=
# MAIL_FROM=
# APPOINTMENT_EMAIL_TO=
EOF
else
  (grep -v "^PORT=" .env; echo "PORT=$PORT") > .env.tmp && mv .env.tmp .env
fi

# --- PM2 ---
echo "==> Iniciando con PM2 en puerto $PORT..."
(pm2 delete web-consultoria 2>/dev/null) || true
NODE_ENV=production PORT=$PORT pm2 start dist/server.js --name web-consultoria
pm2 save
pm2 startup 2>/dev/null || true

echo ""
echo "==> Despliegue listo."
echo "    App: http://$(hostname -I | awk '{print $1}'):$PORT"
echo "    API: http://$(hostname -I | awk '{print $1}'):$PORT/api/health"
echo "    Logs: pm2 logs web-consultoria"
