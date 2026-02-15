# Gestión de Inmuebles

Aplicación full-stack para gestionar usuarios e inmuebles: backend con Node.js/Express/Sequelize/PostgreSQL y frontend con React/Vite.

## Requisitos previos

- **Node.js** (v18 o superior recomendado)
- **PostgreSQL** instalado y en ejecución
- **npm** (incluido con Node.js)

## Pasos para iniciar el proyecto

### 1. Clonar o ubicarse en el proyecto

```bash
cd gestion-inmuebles
```

### 2. Configurar la base de datos

Crea una base de datos en PostgreSQL (`real_estate_management`) y ten a mano:

-Modelos
User: id, name, email, password, isActive, createdAt, updatedAt.
House: id, address, price, status, sellerId, createdAt, updatedAt.

-Relaciones
Un User puede tener muchos Inmuebles vendidos (relación uno a muchos).
Foreign key sellerId en el modelo House referenciando User

### 3. Configurar variables de entorno del backend

En la carpeta `backend`, crea un archivo `.env` con:

```env
DB_NAME=nombre_de_tu_base_de_datos
DB_USER=tu_usuario_postgres
DB_PASS=tu_contraseña
DB_PORT=5432
JWT_SECRET=una_clave_secreta_para_jwt
```

Ajusta los valores según tu instalación de PostgreSQL.

### 4. Instalar dependencias del backend

```bash
cd backend
npm i
```

### 5. Iniciar el backend (servidor API)

```bash
npm run dev
```

El servidor quedará en **http://localhost:3000**. Déjalo corriendo en una terminal.

### 6. Instalar dependencias del frontend

En **otra terminal**, desde la raíz del proyecto:

```bash
cd frontend
npm i
```

### 7. Iniciar el frontend (aplicación React)

```bash
npm run dev
```

La aplicación se abrirá en **http://localhost:5173** (o el puerto que indique Vite).

---

## Resumen de comandos

| Dónde   | Comando      | Descripción                    |
|--------|--------------|--------------------------------|
| backend  | `npm i`      | Instalar dependencias          |
| backend  | `npm run dev`| Servidor con nodemon (puerto 3000) |
| backend  | `npm start`  | Servidor con node (producción) |
| frontend | `npm i`      | Instalar dependencias          |
| frontend | `npm run dev`| Desarrollo con Vite (puerto 5173) |
| frontend | `npm run build` | Build para producción       |
| frontend | `npm run preview` | Vista previa del build    |

## Estructura del proyecto

```
gestion-inmuebles/
├── backend/          # API Express + Sequelize + PostgreSQL
│   ├── models/       # Modelos User, House
│   ├── server.js    # Entrada del servidor
│   └── .env         # Variables de entorno (no subir a git)
├── frontend/        # React + Vite + Tailwind
│   └── src/
└── README.md
```

Para usar la aplicación, mantén **dos terminales abiertas**: una con `npm run dev` en `backend` y otra con `npm run dev` en `frontend`.
