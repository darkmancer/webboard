# Webboard
Dear Datawow team please provide direct feedback if possible thankyou.

## Prerequisites

- Node 18+
- Yarn
- Docker (with compose)

## Commands

| command             | description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| yarn build          | Build both backend and frontend.                                        |
| yarn dev            | Start development mode. Frontend on port 3000 and backend on port 3001. |
| yarn lint           | Run linter                                                              |
| yarn format         | Run prettier to format code                                             |
| yarn db             | Start PostgresDB on port 5432 with docker compose                       |
| yarn db:down        | Stop PostgresDB on port 5432 with docker compose                        |
| yarn test           | Run unit test                                                           |
| yarn test:e2e       | Run end to end test                                                     |
| yarn seed           | Seed countries and roles data into DB. Requires DB running.             |
| yarn migrate:dev    | Run development mode migration.                                         |

## Start development

- start DB with `yarn db`
- run DB migration with `yarn migrate:dev`
- start full app with `yarn dev`

