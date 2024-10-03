# Delivery Management Application

## Project Structure and details

### server

This is the root folder for our backend.

Current directory structure:

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

This is the root folder for our frontend.

## Dependencies

**server**: express typescript ts-node @types/express @types/node passport passport-jwt jsonwebtoken bcryptjs pg @types/pg dotenv

**frontend**:

## .env setup

#Example setup
PORT=3000
JWT_SECRET=paste-the-generated-string-here
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name

To generate a random JWT secret key, you can use a tool like Node.js to create a random string. Here's a simple example:

1. Open your terminal
2. Run the following Node.js script to generate a random string:
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Replace it at `JWT_SECRET=paste-the-generated-string-here`
