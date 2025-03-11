# Webboard

Dear Datawow team please provide direct feedback if possible thankyou.

## Prerequisites

- Node 18+
- Yarn
- Docker (with compose)

## Commands

| command            | description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| yarn docker:up     | Change to the backend folder and start Docker Compose in detached mode.                    |
| yarn db:push       | Push the Prisma schema changes to the database from the backend workspace.                 |
| yarn db:seed       | Seed the database (e.g. with countries and roles) from the backend workspace.              |
| yarn start:backend | Start the NestJS backend server from the backend workspace.                                |
| yarn dev:backend   | Start the backend server in development mode (watch mode) from the backend workspace.      |
| yarn dev:frontend  | Start the Next.js frontend development server from the frontend workspace.                 |
| yarn setup:all     | Install all dependencies, start Docker Compose, push Prisma schema, and seed the database. |
| yarn dev:all       | Run both the backend and frontend development servers concurrently.                        |

## Start development

For the first time setting up run

```
yarn setup:all
```

then run

```
 yarn dev:all
```
