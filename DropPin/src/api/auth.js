const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000/")
    .trim()
    .replace(/\/+$/, "");

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, { ...options, credentials: "include" });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : null;

    if (!response.ok) {
        const error = new Error(
            data?.error || `Request failed with status ${response.status}`,
        );
        error.status = response.status;
        throw error;
    }
    return data;
}

export function registeredAccount(email, password) {
    return request("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
}

export function loginAccount(email, password) {
    return request("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
}

export function getCurrentUser() {
    return request("/api/auth/me");
}

export function logoutAccount(email, password) {
    return request("/api/auth/logout", {
        method: "POST",
    });
}