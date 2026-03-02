# CRM Calendario Clínica

CRM web para gestionar citas de forma **manual**, con la misma lógica que el flujo n8n **Programa agendar2**: integración con **Cal.com** (ver disponibilidad, consultar, agendar, cancelar y mover citas).

## Requisitos

- Node.js 18+
- Cuenta Cal.com con API key (la misma que usas en n8n)

## Configuración

1. Copia el ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y rellena:
   - **CALCOM_API_KEY**: tu API key de Cal.com (en n8n estaba en el credential "Cal.com Prueba 1").
   - **CALCOM_USERNAME**: por defecto `softwaregandia-1zc1b2`.
   - **CALCOM_EVENT_TYPE_SLUG**: por defecto `calendario-clinica-1`.
   - **PORT**: puerto del servidor (por defecto 4001).

## Instalación y ejecución

```bash
cd crm-calendario-clinica
npm install
npm start
```

Abre en el navegador: **http://localhost:4001**

## Funciones (equivalentes al n8n)

| Acción en n8n | En el CRM |
|---------------|-----------|
| **mirar_disponibilidad_clinica** | Sección 1: Ver disponibilidad (fecha + periodo → lista de huecos). |
| **ver_disponibilidad_clinica** | Misma sección 1. |
| **consultar_citas_clinica** | Sección 2: Consultar citas (teléfono → citas pendientes). |
| **agendar_cita_clinica** | Sección 3: Agendar cita (nombre, teléfono, fecha/hora). |
| **cancelar_cita_clinica** | Sección 4: Cancelar cita (teléfono → elegir cita → cancelar). |
| **mover_cita_clinica** | Sección 5: Mover cita (teléfono → elegir cita → nueva fecha/hora). |

Las llamadas del CRM van a la misma API de Cal.com (v2) que usa el webhook de n8n.
