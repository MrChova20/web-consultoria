# Despliegue en tu VPS

Todo el proyecto (frontend + API) corre en **un solo proceso** y **un solo puerto**. El backend sirve la web estática y la API.

---

## Tu VPS

| | |
|---|---|
| **Host** | `137.74.115.81` |
| **Usuario** | `ubuntu` |
| **Clave SSH** | `$env:USERPROFILE\.ssh\id_ed25519_pablo` (Windows) |

### Conectar desde Windows (PowerShell)

```powershell
ssh -i $env:USERPROFILE\.ssh\id_ed25519_pablo -o StrictHostKeyChecking=no ubuntu@137.74.115.81
```

### Conectar desde Linux / Mac

```bash
ssh -i ~/.ssh/id_ed25519_pablo -o StrictHostKeyChecking=no ubuntu@137.74.115.81
```

Una vez dentro, la web quedará en: **http://137.74.115.81:PUERTO** (ej. `http://137.74.115.81:4000`).

### Subir el proyecto desde Windows (PowerShell)

Después de hacer el build local (ver sección 2), sube la carpeta `backend` al VPS:

```powershell
# Desde la raíz del proyecto (web-consultoria), tras haber ejecutado el build
scp -i $env:USERPROFILE\.ssh\id_ed25519_pablo -o StrictHostKeyChecking=no -r backend ubuntu@137.74.115.81:~/
```

Luego conecta por SSH y arranca la app (ver secciones 4–6 más abajo).

**Automático (PowerShell):** desde la raíz del proyecto, ejecuta el script que hace build, sube el backend y arranca con PM2 en el VPS:

```powershell
.\scripts\deploy-to-vps.ps1
```

En el VPS debe existir Node.js y PM2 (`npm install -g pm2`). La primera vez crea `backend/.env` en el VPS en `~/backend-deploy/.env` con las variables de la sección 4.

---

## 1. Puerto

Por defecto el backend usa el puerto **5000**. Para este VPS se usa **4000** (el 3000 suele estar ocupado). Para cambiar:

```bash
export PORT=4000
```

Elige un puerto libre (ej: 4000, 8080, 9000). **No uses 3000** si ya está en uso. Comprueba que esté libre:

```bash
# Linux
ss -tlnp | grep :4000
# o
lsof -i :4000
```

## 2. Build en tu máquina (o en el VPS)

Desde la raíz del proyecto:

```bash
# Linux / Mac
chmod +x scripts/deploy-vps.sh
./scripts/deploy-vps.sh
```

En Windows (PowerShell), paso a paso:

```powershell
cd frontend
npm ci
npm run build
cd ..
mkdir -Force backend\public
Copy-Item -Recurse frontend\dist\* backend\public\
cd backend
npm ci
npm run build
cd ..
```

## 3. Subir al VPS

Sube la carpeta **backend** completa (con `dist/`, `public/`, `node_modules/`, `package.json`) y el archivo **.env** del backend. No subas `frontend/` si ya hiciste el build.

O clona el repo en el VPS y ejecuta `./scripts/deploy-vps.sh` allí.

## 4. Variables de entorno en el VPS

En el VPS, en `backend/.env` (o donde ejecutes), necesitas al menos:

```env
NODE_ENV=production
PORT=4000

# Correo (formulario de cita y envíos)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=tu-email@gmail.com
MAIL_PASS=tu-app-password
MAIL_FROM=tu-email@gmail.com

# Opcional: a qué email llegan las citas agendadas
APPOINTMENT_EMAIL_TO=softwaregandia@gmail.com
```

## 5. Ejecutar

```bash
cd backend
NODE_ENV=production PORT=4000 npm start
```

La web y la API quedan en: **http://TU_VPS_IP:4000**

- Web: `http://TU_VPS_IP:4000/`
- API health: `http://TU_VPS_IP:4000/api/health`

## 6. Dejar corriendo con PM2 (recomendado)

```bash
npm install -g pm2
cd backend
NODE_ENV=production PORT=4000 pm2 start dist/server.js --name web-consultoria
pm2 save
pm2 startup   # para que arranque al reiniciar el VPS
```

Ver logs: `pm2 logs web-consultoria`

## 7. Nginx como proxy (opcional)

Si quieres usar el puerto 80 o HTTPS con dominio:

```nginx
server {
    listen 80;
    server_name tudominio.com;
    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Cambia `4000` por el puerto que uses.
