# Task Manager - Glimmer Technical Challenge

Aplicacion fullstack para gestion de tareas con React + Express + PostgreSQL.

## Funcionalidades

### Core
- Listar tareas.
- Crear tarea desde modal en frontend.
- Actualizar tarea.
- Editar tarea desde modal en frontend.
- Eliminar tarea.
- Marcar tarea como completada / pendiente.
- Validaciones de entrada en backend con Joi.
- Manejo centralizado de errores en backend.

### Extra implementado
- Busqueda por texto (`title`/`description`).
- Filtro por estado (`all`, `completed`, `pending`).
- Paginacion server-side.
- Testing en backend y frontend.

## Stack Tecnologico

- Frontend: React 19 + TypeScript + TailwindCSS (Vite)
- Backend: Node.js + Express
- ORM/DB: Prisma + PostgreSQL
- Testing:
  - Backend: Jest + Supertest
  - Frontend: Vitest + Testing Library
- Package manager: `pnpm`

## Estructura del Proyecto

```txt
/backend
/frontend
README.md
EXPLICACION_ENTREVISTA.md
```

## Estructura de Carpetas

### Backend

```txt
backend/
  prisma/
    migrations/
    schema.prisma
  src/
    __tests__/
      tasks.api.test.js
    controllers/
      tasks.controller.js
    db/
      prisma.js
    middlewares/
      error.middleware.js
      validate.middleware.js
    routes/
      index.js
      tasks.routes.js
    services/
      tasks.service.js
    utils/
      http-error.js
    validators/
      tasks.validators.js
    app.js
    index.js
  .env.example
  package.json
```

### Frontend

```txt
frontend/
  src/
    components/
      EditTaskModal.tsx
      PaginationControls.tsx
      TaskFilters.tsx
      TaskForm.tsx
      TaskItem.tsx
      TaskList.tsx
    pages/
      TasksPage.tsx
      TasksPage.test.tsx
    services/
      tasks.service.ts
    utils/
      format.ts
    test/
      setup.ts
    types/
      task.ts
    App.tsx
    main.tsx
    index.css
  .env.example
  package.json
  vite.config.ts
```

## Requisitos

- Node.js 20+
- pnpm 10+
- PostgreSQL 14+

## Variables de Entorno

### Backend (`backend/.env`)

Referencia en `backend/.env.example`.

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/task_manager?schema=public"
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

Referencia en `frontend/.env.example`.

```env
VITE_API_URL=http://localhost:3000/api
```

## Setup del Proyecto

### 1) Instalar dependencias

```bash
pnpm -C backend install
pnpm -C frontend install
```

### 2) Preparar base de datos

Con PostgreSQL corriendo y `DATABASE_URL` configurada:

```bash
pnpm -C backend run prisma:generate
pnpm -C backend run prisma:migrate:deploy
```

Si estas en desarrollo y quieres crear/aplicar migraciones nuevas:

```bash
pnpm -C backend run prisma:migrate:dev
```

### 3) Levantar backend

```bash
pnpm -C backend dev
```

Backend disponible en `http://localhost:3000`.

### 4) Levantar frontend

```bash
pnpm -C frontend dev
```

Frontend disponible en `http://localhost:5173`.

## API (resumen)

Base URL: `/api/tasks`

- `GET /api/tasks`
  - Query params opcionales:
    - `search` (string)
    - `completed` (`true`/`false`)
    - `page` (int)
    - `limit` (int)
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Respuesta de listado

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

## Tests

### Backend

```bash
pnpm -C backend test
```

### Frontend

```bash
pnpm -C frontend test
```

Incluye pruebas de:
- carga inicial,
- creacion de tarea via modal.

## Scripts utiles

### Backend
- `pnpm -C backend dev`
- `pnpm -C backend test`
- `pnpm -C backend run prisma:generate`
- `pnpm -C backend run prisma:migrate:dev`
- `pnpm -C backend run prisma:migrate:deploy`

### Frontend
- `pnpm -C frontend dev`
- `pnpm -C frontend run build`
- `pnpm -C frontend run lint`
- `pnpm -C frontend test`
