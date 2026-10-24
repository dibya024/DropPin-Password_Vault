# 🔐 DropPin — Password Manager

DropPin is a password manager web application built with React, Vite, Express, and MongoDB. The frontend manages saved credentials, and the backend exposes API endpoints for password entries and account registration.

## ✨ Features

- 🔑 **Password Management** — Add and manage your saved credentials.
- 👁️ **Show/Hide Passwords** — Toggle password visibility.
- 📋 **Easy Access** — View and organize your saved entries.
- 🧾 **Account registration API** — Register with an email address and password.
- 🎨 **Clean UI** — A simple, responsive interface.
- ⚡ **Fast Performance** — Powered by React and Vite.

## 🛠️ Tech Stack

- **React** — Component-based user interface
- **Vite** — Development server and build tool
- **JavaScript (ES6+)** — Application logic
- **CSS** — Styling
- **ESLint** — Code quality and linting
- **Express and MongoDB** — Backend API and data storage
- **Mongoose** — MongoDB object modeling
- **bcryptjs** — Hashing account passwords during registration

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

   Create a `backend/.env` file with your MongoDB connection string:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

   Keep `.env` private and never commit credentials. Start the backend:

   ```bash
   npm run dev
   ```

5. In a second terminal, start the frontend from the `DropPin` directory:

   ```bash
   cd DropPin
   npm run dev
   ```

6. Open the local frontend URL, usually `http://localhost:5173/`.

The frontend expects the API at `http://localhost:3000` by default. Set `VITE_API_URL` in the frontend environment if the backend is running at a different URL.

## 🔌 Backend API

The backend listens on port `3000` by default. Current endpoints are:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/passwords` | Fetch saved password entries |
| `POST` | `/api/passwords` | Create a password entry |
| `PUT` | `/api/passwords/:id` | Update a password entry |
| `DELETE` | `/api/passwords/:id` | Delete a password entry |
| `POST` | `/api/auth/register` | Register an account using email and password |

Registration requires a valid email and a password of at least 8 characters. The backend hashes the account password before storing it and returns the new account's ID and email.

Login, logout, session management, and authorization are **not implemented yet**. The password-entry endpoints are currently unauthenticated and are not scoped to individual accounts.

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

## 🔒 Security Note

This project is intended for learning and development unless its security has been independently reviewed.

**Do not store real passwords or sensitive credentials in this application.** Account registration currently hashes account passwords, but login and authorization are not implemented. Saved password entries are currently stored without encryption and are accessible through unauthenticated API endpoints. Before using DropPin with real credentials, implement and verify authentication, per-user authorization, encryption, secure key management, and safe storage practices.

Never commit API keys, encryption keys, `.env` files, or real user credentials to GitHub.

## 🗺️ Future Improvements

- [ ] Add secure password storage and encryption.
- [ ] Implement password generation.
- [ ] Add search and filtering.
- [ ] Add copy-to-clipboard functionality.
- [ ] Improve mobile responsiveness.
- [ ] Complete authentication, authorization, and secure backup options.

## 👨‍💻 Author

**Dibya Sahoo**

- GitHub: [@dibya024](https://github.com/dibya024)

## 📄 License

This project is currently available for learning and personal development. Add a license file if you intend to specify formal permissions for reuse and distribution.
