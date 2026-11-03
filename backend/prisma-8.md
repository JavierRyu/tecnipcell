# ¡Bienvenido a Prisma ORM!

Prisma ORM permite interactuar con bases de datos utilizando TypeScript de una manera sencilla, clara y fácil de leer.

Define cómo están estructurados tus datos y Prisma ORM generará un cliente completamente tipado, con autocompletado para cada tabla, columna y relación.

Este proyecto está configurado para utilizar **PostgreSQL**, aunque Prisma ORM también es compatible con otras bases de datos.

## Requisitos

- **PostgreSQL 15 o superior:** las versiones anteriores no son compatibles. Puedes ejecutar `SELECT version()` en tu servidor para verificar la versión instalada.
- La CLI no se conecta a tu base de datos sin autorización explícita. Si deseas que el comando `init` verifique la versión del servidor, utiliza la opción `--probe-db` al ejecutar `npx prisma orm init`.

## Contrato de datos

El contrato de datos es el núcleo de la aplicación. Se encuentra en:

`src/prisma/contract.prisma`

Aquí se definen los modelos que representan la estructura de los datos.

Ejemplo:

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  username String?
  name     String?
}
```

Cada modelo definido en el contrato podrá consultarse desde la aplicación.

Ejemplo de consulta:

```typescript
import { db } from './src/prisma/db';

const user = await db.orm.public.User
  .where({ email: 'alice@example.com' })
  .first();
```

Prisma ORM proporciona autocompletado y comprobación de tipos en el editor de código.

### Archivos complementarios

El contrato cuenta con dos archivos complementarios:

- **`contract.json`:** contiene información sobre los modelos existentes en la aplicación.
- **`contract.d.ts`:** proporciona las definiciones de tipos necesarias para el autocompletado y la comprobación de tipos en TypeScript.

Ambos archivos deben incluirse en Git.

Cuando se modifique el contrato, se debe ejecutar:

```bash
npx prisma contract emit
```

Este comando actualiza automáticamente los archivos complementarios.

## Configuración

El archivo `prisma.config.ts` indica dónde se encuentra el contrato de datos y cómo conectarse a la base de datos.

Ejemplo:

```typescript
import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
```

La variable `DATABASE_URL` se encuentra definida en el archivo `.env`.

Ejemplo:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

Esta variable contiene la información necesaria para establecer la conexión con PostgreSQL.

## Comandos principales

| Comando | Descripción |
|---|---|
| `npx prisma contract emit` | Actualiza `contract.json` y `contract.d.ts`. |
| `npx prisma db init` | Inicializa las tablas en la base de datos. |
| `npx prisma migration status` | Muestra el estado de las migraciones. |

## Estructura de archivos

| Archivo | Función |
|---|---|
| `src/prisma/contract.prisma` | Define los modelos y la estructura de los datos. |
| `prisma.config.ts` | Configura Prisma ORM y la conexión a la base de datos. |
| `src/prisma/db.ts` | Contiene el cliente para interactuar con la base de datos. |
| `src/prisma/contract.json` | Contrato compilado y generado automáticamente. |
| `src/prisma/contract.d.ts` | Definiciones de tipos para TypeScript. |

## Flujo de trabajo

Para trabajar con Prisma ORM se deben seguir estos pasos:

1. **Modificar el contrato:** editar `src/prisma/contract.prisma` para agregar o modificar modelos.
2. **Generar los archivos:** ejecutar `npx prisma contract emit` para actualizar los archivos complementarios.
3. **Consultar los modelos:** utilizar el cliente de Prisma ORM desde la aplicación, aprovechando el autocompletado y la comprobación de tipos.

## Consideraciones para Monorepos (pnpm workspaces)

Si el proyecto utiliza pnpm workspaces, se deben considerar los siguientes aspectos:

- **Catálogos:** si `pnpm-workspace.yaml` define un catálogo para `prisma` o `@prisma/orm-postgres`, pnpm utilizará las versiones especificadas en dicho catálogo.
- **pnpm dlx:** permite ejecutar `pnpm dlx prisma@latest orm init` desde cualquier directorio. Sin embargo, dentro de un workspace se respetarán las versiones definidas en los catálogos y configuraciones.
- **Alternativa con npm:** si pnpm encuentra errores de resolución relacionados con `workspace:*` o `catalog:`, el proceso de inicialización puede recurrir automáticamente a npm. Una vez corregido el problema, se puede volver a utilizar pnpm mediante `pnpm install`.

---

**En resumen:** Prisma ORM permite definir la estructura de la base de datos mediante un contrato, generar tipos para TypeScript y realizar consultas con autocompletado, facilitando el desarrollo y mantenimiento de la aplicación.
