# Delivery Management Application

This project is a Delivery Management Application with a backend (server) built using Node.js, Express, and PostgreSQL, and a frontend (client) in React. The app manages delivery operations, user authentication, and order tracking.

## Project Structure and details

### Server (Backend)

The backend is structured as follows:

```typescript
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
```

- `config/:` For database config and any environment setup.
- `controllers/:` Where you’ll define the core logic (handling requests and responses).
- `middleware/:` For middleware like authentication or error handling.
- `models/:` To define how data is structured (database models).
- `routes/:` To define API endpoints.
- `types:` To create/modify types for the backend.
- `index.ts:` The main entry point for the backend server.

### Client (Frontend)

## Installation and setup

### Prerequisites

- Node.js (v20.11.1 or later)
- PostgreSQL
- npm (v10.2.4 or later)

### Backend Setup

1. lone the repo
2. `cd delivery-management-app/server`
3. `npm install`
4. Set up the `.env` file
5. Run the server: `npm run dev`
6. To start the server for prod: `npm start`

## Dependencies

### Server

- **Express:** Web framework for handling HTTP requests.
- **TypeScript:** Typed superset of JavaScript.
- **Passport:** Authentication middleware for handling login and sessions.
- **JWT:** For token-based authentication.
- **Bcryptjs:** For hashing passwords.
- **PostgreSQL:** Relational database used for storing data.
- **Dotenv:** For environment variable management.

To install the dependencies run:
`npm install express typescript ts-node @types/express @types/node passport passport-jwt jsonwebtoken bcryptjs pg @types/pg dotenv`

### Frontend

## .env setup

**Example setup**
PORT=3000
JWT_SECRET=paste-the-generated-string-here
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name

### Generating a JWT Secret

To generate a random JWT secret key, you can use a tool like Node.js to create a random string. Here's a simple example:

1. Open your terminal
2. Run the following Node.js script to generate a random string:
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Replace it at `JWT_SECRET=paste-the-generated-string-here`

## Scripts

- `npm run dev`: Starts the backend server in development mode using `ts-node`
