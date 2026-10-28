# Password Manager (DropPin)

DropPin is a password manager with a React frontend and an Express/MongoDB backend. Users can register, sign in with a server-side session, verify their email, and manage password entries stored for their account. Vault passwords are encrypted at rest with AES-256-GCM; account passwords are hashed with bcrypt.

## Features

- Account registration and login using email or username
- MongoDB-backed sessions and protected API routes
- Email verification with expiring, attempt-limited one-time codes
- Create, view, edit, and delete password entries
- Per-user ownership checks for vault entries
- AES-256-GCM encryption for saved vault passwords

## Requirements

- Node.js and npm
- MongoDB connection string (local MongoDB or MongoDB Atlas)
- A Resend account and API key to send verification emails

## Setup

### 1. Configure the backend

In PowerShell, from the repository root:

```powershell
Set-Location .\backend
npm install
```

Create `backend/.env` with these settings:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=replace_with_a_long_random_secret
VAULT_ENCRYPTION_KEY=your_base64_encoded_32_byte_key
OTP_HASH_SECRET=replace_with_another_long_random_secret
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=DropPin <onboarding@resend.dev>
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

The Resend test sender `onboarding@resend.dev` is suitable for development, subject to Resend's current test-sending restrictions. For production, verify a domain with Resend and use a sender address on that domain.

Generate the vault encryption key once:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Use the generated value for `VAULT_ENCRYPTION_KEY`. Keep it private, back it up securely, and do not rotate or lose it without first migrating the encrypted vault data; otherwise, existing saved passwords cannot be decrypted. Keep `.env` out of version control.

Start the backend from the `backend` directory:

```powershell
npm run dev
```

The backend listens on port `3000` by default.

### 2. Configure and run the frontend

Open another PowerShell terminal from the repository root:

```powershell
Set-Location .\DropPin
npm install
```

The frontend defaults to `http://localhost:3000` for its API. If your backend uses a different address, create `DropPin/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```powershell
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

For local development, use `NODE_ENV=development` and use the same hostname consistently (for example, `localhost`) for the frontend and backend. In production, configure the frontend and backend origins, use HTTPS, and set the backend cookie/CORS settings appropriately.

## Available scripts

Run frontend scripts from `DropPin`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

Run backend scripts from `backend`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the backend with nodemon |
| `npm start` | Start the backend |

## API routes

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register an account |
| `POST` | `/api/auth/login` | Sign in and create a session |
| `GET` | `/api/auth/me` | Return the signed-in user |
| `POST` | `/api/auth/logout` | Destroy the current session |
| `POST` | `/api/auth/email-verification/request` | Send a verification code |
| `POST` | `/api/auth/email-verification/verify` | Verify an email code |
| `GET` | `/api/passwords` | List the signed-in user's vault entries |
| `POST` | `/api/passwords` | Add a vault entry |
| `PUT` | `/api/passwords/:id` | Update a vault entry |
| `DELETE` | `/api/passwords/:id` | Delete a vault entry |

Authentication uses an HTTP-only session cookie. The frontend sends credentials with API requests; the backend CORS origin must match the frontend origin.

## Repository layout

```text
.
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── DropPin/
    ├── CSS/
    ├── public/
    ├── src/
    │   ├── api/
    │   └── components/
    ├── package.json
    └── vite.config.js
```

## Security

This project is not a substitute for an independent security review. Do not commit `.env` files, API keys, session secrets, encryption keys, or real credentials. Use HTTPS in production and protect backups of `VAULT_ENCRYPTION_KEY`; database access together with that key can expose stored vault passwords.
