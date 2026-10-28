# DropPin

DropPin is a React web app for managing account-specific saved logins. It provides account registration and sign-in, a protected password vault, and profile controls in a responsive interface.

## Features

- Register and sign in with an email or username.
- Verify an account email with a verification code.
- Create, view, edit, and delete saved login entries.
- View and manage account profile details.
- Use a responsive interface with public and authenticated routes.

## Tech stack

- React 19
- Vite
- React Router
- Tailwind CSS
- React Toastify

The frontend communicates with the DropPin API using credentialed HTTP requests and session cookies. The API service must be running separately.

## Requirements

- Node.js and npm
- A running DropPin API service

## Run locally

From the `DropPin` directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

By default, the frontend sends API requests to `http://localhost:3000`. To use another API origin, create a `.env.local` file in the `DropPin` directory:

```env
VITE_API_URL=http://localhost:3000
```

Restart the development server after changing environment variables. For production, set `VITE_API_URL` to the deployed API origin when building the frontend. Since this variable is included in the client build, do not put secrets in it.

## Routes

| Route | Access | Page |
|---|---|---|
| `/` | Public | Pre-login homepage |
| `/signup` | Public | Account registration |
| `/login` | Public | Sign in |
| `/home` | Signed-in users | Add and manage saved logins |
| `/view-store` | Signed-in users | View saved logins |
| `/profile` | Signed-in users | Profile and account controls |

Unauthenticated visitors who open a protected route are redirected to `/login`.

## API integration

The frontend expects the API origin configured by `VITE_API_URL` and calls these endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/auth/email-verification/request`
- `POST /api/auth/email-verification/verify`
- `GET /api/passwords`
- `POST /api/passwords`
- `PUT /api/passwords/:id`
- `DELETE /api/passwords/:id`

The API must support credentialed requests from the frontend origin. Configure its CORS and session-cookie settings appropriately for the environment; use HTTPS in production.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
DropPin/
├── public/                 # Static public assets
├── CSS/                    # Page and component styles
├── src/
│   ├── api/                # API request helpers
│   ├── assets/             # Imported app assets
│   ├── components/         # Pages and shared UI
│   ├── App.jsx             # Routes and application state
│   └── main.jsx            # Frontend entry point
├── index.html
├── package.json
└── vite.config.js
```


## Author

**Dibyaranjan Sahoo**

- GitHub: [@dibya024](https://github.com/dibya024)