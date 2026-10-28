# 🔐 DropPin — Password Manager

DropPin is a password manager web application built with React, Vite, Express, Node and MongoDB. Users can register and sign in, and manage password entries scoped to their account.

## ✨ Features

- 🔑 **Password Management** — Add and manage your saved credentials.
- 👁️ **Show/Hide Passwords** — Toggle password visibility.
- 📋 **Easy Access** — View and organize your saved entries.
- 🧾 **Account authentication** — Register, sign in, check the current session, and sign out.
- 🔐 **Protected vault** — Password-entry endpoints require a session and enforce per-user ownership.
- 🔒 **Encrypted storage** — Vault passwords are encrypted at rest with AES-256-GCM.
- 🎨 **Clean UI** — A simple, responsive interface.
- ⚡ **Fast Performance** — Powered by React and Vite.

## 🛠️ Tech Stack

- **React** — Component-based user interface
- **Vite** — Development server and build tool
- **JavaScript (ES6+)** — Application logic
- **TailwindCSS** — Styling
- **ESLint** — Code quality and linting
- **Express and MongoDB** — Backend API and data storage
- **Mongoose** — MongoDB object modeling
- **bcryptjs** — Hashing account passwords during registration
- **Node.js crypto** — AES-256-GCM encryption for saved vault passwords

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dibya024/Password-Manager.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Password-Manager
   ```

3. Install frontend dependencies:

   ```bash
   cd DropPin
   npm install
   ```

4. In a separate terminal, configure and start the backend from the repository root:

   ```bash
   cd backend
   npm install
   ```

   Create a `backend/.env` file with your MongoDB connection string, session secret, and vault encryption key:

   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_long_random_session_secret
   VAULT_ENCRYPTION_KEY=your_base64_encoded_32_byte_key
   PORT=3000
   ```

   Generate `VAULT_ENCRYPTION_KEY` once with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"` from the backend directory. Keep this key backed up securely and unchanged: losing or rotating it without re-encrypting the vault makes encrypted passwords unreadable. Keep `.env` private and never commit credentials. Passwords belonging to a signed-in user are encrypted with AES-256-GCM at rest. Owned legacy plaintext entries are encrypted when first fetched; records without a confirmed `userId` are neither returned nor migrated automatically.

   For deployment, configure `MONGO_URI`, `SESSION_SECRET`, `VAULT_ENCRYPTION_KEY`, and `PORT` as backend environment variables in the hosting provider. Configure the frontend's `VITE_API_URL` to the deployed backend origin, and update the backend CORS origin in `server.js` to the deployed frontend origin. Use HTTPS in production so session cookies and API traffic are protected in transit. Never commit or expose the encryption key.

   Start the backend:

   ```bash
   npm run dev
   ```

5. In a second terminal, start the frontend from the `DropPin` directory:

   ```bash
   cd DropPin
   npm run dev
   ```

6. Open the local frontend URL, usually `http://localhost:5173/`.

The frontend expects the API at `http://localhost:3000` by default. Set `VITE_API_URL` in the frontend environment if the backend is running at a different origin. Rebuild/redeploy the frontend after changing this Vite environment variable.

## 🔌 Backend API

The backend listens on port `3000` by default. Current endpoints are:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/passwords` | Fetch saved password entries |
| `POST` | `/api/passwords` | Create a password entry |
| `PUT` | `/api/passwords/:id` | Update a password entry |
| `DELETE` | `/api/passwords/:id` | Delete a password entry |
| `POST` | `/api/auth/register` | Register an account using email and password |
| `POST` | `/api/auth/login` | Sign in and create a session |
| `GET` | `/api/auth/me` | Check the current session |
| `POST` | `/api/auth/logout` | End the current session |

Password endpoints require an authenticated session and limit every read, create, update, and delete operation to the current user's entries. Registration requires a valid email and a password of at least 8 characters. Account passwords are hashed with bcrypt before storage; saved vault passwords are encrypted with AES-256-GCM and decrypted only when returned to the authenticated user.

## 📁 Project Structure

```text
Password-Manager/
├── backend/
│   ├── models/
│   │   ├── Document.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   └── passwordRouter.js
│   ├── utils/
│   │   └── passwordEncryption.js
│   ├── server.js
│   └── package.json
└── DropPin/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🧑‍💻 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

## 🔒 Security Notes

This project is intended for learning and development. Authentication and per-user authorization are implemented, and vault password fields are encrypted at rest; however, this does not constitute an independent security review or guarantee the application is safe for production use.

Protect `VAULT_ENCRYPTION_KEY` as a critical secret. Anyone with access to both the database and this key can decrypt the vault. Keep secure backups of the key, use HTTPS in production, and review the hosting provider's session and cookie settings before deployment. Legacy records without an owner are intentionally not assigned to an account automatically.

Never commit API keys, encryption keys, `.env` files, or real user credentials to GitHub.

## 🗺️ Future Improvements

- [ ] Implement password generation.
- [ ] Add search and filtering.
- [ ] Add copy-to-clipboard functionality.
- [ ] Improve mobile responsiveness.
- [ ] Add secure vault-key backup and recovery workflows.

## 👨‍💻 Author

**Dibyaranjan Sahoo**

- GitHub: [@dibya024](https://github.com/dibya024)

## 📄 License

This project is currently available for learning and personal development. Add a license file if you intend to specify formal permissions for reuse and distribution.
