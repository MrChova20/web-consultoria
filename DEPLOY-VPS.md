# Despliegue en tu VPS

Todo el proyecto (frontend + API) corre en **un solo proceso** y **un solo puerto**. El backend sirve la web estática y la API.

---

## Llegar a ~/apps/web-consultoria y desplegar (recomendado)

Clona el repo desde GitHub en **~/apps/web-consultoria** y despliega en el **primer puerto libre** (4000, 5000, 8080, 9000, …) para no chocar con otros proyectos.

| | |
|---|---|
| **Host** | `vps-d3220941` (o la IP que tengas configurada, ej. `137.74.115.81`) |
| **Usuario** | `ubuntu` |
| **Ruta en VPS** | `~/apps/web-consultoria` |

### Opción A: Desde tu PC (PowerShell)

Ejecuta esto desde la raíz del proyecto (o desde cualquier sitio si tienes el script). El script se envía por SSH y en el VPS: crea `~/apps`, clona el repo, hace build y arranca con PM2 en un puerto libre.

```powershell
$VPS = "ubuntu@vps-d3220941"
$KEY = "$env:USERPROFILE\.ssh\id_ed25519_pablo"
Get-Content .\scripts\setup-and-deploy-vps.sh -Raw | ssh -i $KEY -o StrictHostKeyChecking=no $VPS 'bash -s'
```

Si usas la IP en lugar del hostname:

```powershell
Get-Content .\scripts\setup-and-deploy-vps.sh -Raw | ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@137.74.115.81 'bash -s'
```

Al finalizar verás la URL (IP:PUERTO). En el VPS: `pm2 logs web-consultoria`.

### Opción B: Dentro del VPS

Conéctate y ejecuta:

```bash
ssh -i ~/.ssh/id_ed25519_pablo -o StrictHostKeyChecking=no ubuntu@vps-d3220941
```

Una vez dentro:

```bash
mkdir -p ~/apps && cd ~/apps
git clone https://github.com/MrChova20/web-consultoria.git
cd web-consultoria
chmod +x scripts/setup-and-deploy-vps.sh
./scripts/setup-and-deploy-vps.sh
```

Quedarás en `~/apps/web-consultoria` y la app correrá en un puerto no usado (el script lo elige solo). Para actualizar más adelante:

```bash
cd ~/apps/web-consultoria
git pull
./scripts/setup-and-deploy-vps.sh
```

**Requisitos en el VPS:** Node.js (v18+), npm, git y PM2 (`npm install -g pm2`). La primera vez el script crea `backend/.env` con `PORT`; edita ese archivo para añadir correo (MAIL_*, APPOINTMENT_EMAIL_TO) si usas el formulario de citas.

---

## Tu VPS (referencia)

| | |
|---|---|
| **Host** | `vps-d3220941` / `137.74.115.81` |
| **Usuario** | `ubuntu` |
| **Clave SSH** | `$env:USERPROFILE\.ssh\id_ed25519_pablo` (Windows) |

### Conectar desde Windows (PowerShell)

```powershell
ssh -i $env:USERPROFILE\.ssh\id_ed25519_pablo -o StrictHostKeyChecking=no ubuntu@vps-d3220941
```

### Conectar desde Linux / Mac

```bash
ssh -i ~/.ssh/id_ed25519_pablo -o StrictHostKeyChecking=no ubuntu@vps-d3220941
```

Una vez dentro, la web quedará en: **http://TU_VPS_IP:PUERTO** (el script indica el puerto usado, ej. 4000).

### URLs de acceso (web-consultoria)

En el mismo VPS hay otros proyectos en otros puertos. Para **este** proyecto:

| Uso | URL |
|-----|-----|
| **Por IP y puerto** (acceso directo) | **http://137.74.115.81:4000/** |
| **Por dominio** (sin puerto, HTTPS) | **https://gandiasoftware.com** |

Ambas sirven la misma app; Nginx en el 80/443 redirige el dominio al puerto 4000.

### Si obtienes ERR_CONNECTION_TIMED_OUT

El navegador no puede conectar porque el **puerto (ej. 4000) está bloqueado**. Hay que abrirlo en dos sitios:

**1. Firewall del VPS (UFW)** — conectado por SSH:

```bash
# Ver estado
sudo ufw status

# Permitir el puerto (ej. 4000) y recargar
sudo ufw allow 4000/tcp
sudo ufw reload

# Si UFW estaba inactive, activarlo deja SSH (22) permitido; asegúrate de no cerrar el 22
sudo ufw allow 22/tcp
sudo ufw enable
```

**2. Firewall / reglas del proveedor (OVH, AWS, etc.)**  
En el panel de control del VPS (OVH Cloud, AWS Security Groups, etc.) añade una regla **entrante** para **TCP puerto 4000** (origen: 0.0.0.0/0 o “Todo el mundo”) y guarda. Sin esto, el tráfico ni siquiera llega al servidor.

Después de abrir el puerto, prueba de nuevo: **http://137.74.115.81:4000**

### Registro A para www (HTTPS)
En la **Configuración DNS personalizada** añade un registro **A**:
- **Nombre de host:** `www` (o `www.gandiasoftware.com` si el panel lo pide así)
- **Apunte a / Valor:** `137.74.115.81`
- **TTL:** 3600 (o el que use el resto)

Así **www.gandiasoftware.com** irá al mismo VPS que la raíz y podrás tener HTTPS para ambos.

### Usar dominio (gandiasoftware.com) sin poner puerto

DNS no permite configurar puerto; el navegador usa el 80 por defecto. Para que **gandiasoftware.com** abra tu app:

1. **DNS:** En tu proveedor de dominio, pon el registro **A** de `gandiasoftware.com` apuntando a **137.74.115.81** (no a 76.76.21.21).
2. **Nginx en el VPS:** Proxy del puerto 80 al 4000. En el VPS:
   - Sube o crea el fichero con el contenido de `scripts/nginx-gandiasoftware.conf`.
   - Luego:
     ```bash
     sudo cp /ruta/nginx-gandiasoftware.conf /etc/nginx/sites-available/gandiasoftware.com
     sudo ln -sf /etc/nginx/sites-available/gandiasoftware.com /etc/nginx/sites-enabled/
     sudo nginx -t && sudo systemctl reload nginx
     ```
   Así **http://gandiasoftware.com** (puerto 80) mostrará la app que corre en el 4000.

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
