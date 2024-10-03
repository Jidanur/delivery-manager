# Delivery Management Application

## Project Structure and details

### server

backend

server/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.ts
├── tsconfig.json
├── package.json

- `config/:` For database config and any environment setup.
- `controllers/:` Where you’ll define the core logic (handling requests and responses).
- `middleware/:` For middleware like authentication or error handling.
- `models/:` To define how data is structured (database models).
- `routes/:` To define API endpoints.

### client

frontend

## Dependencies

**server**: express typescript ts-node @types/express @types/node passport passport-jwt jsonwebtoken bcryptjs pg @types/pg
