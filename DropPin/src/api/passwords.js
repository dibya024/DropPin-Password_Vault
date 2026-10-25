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
            data?.error || `Request failed with status ${response.status}`
        );
        error.status = response.status;
        throw error;
    }
    return data;
}

export async function getPasswords() {
    const passwords = await request("/api/passwords");
    if (!Array.isArray(passwords)) {
        throw new Error("The server returned an invalid passwords response");
    }
    return passwords;
}

export async function createPassword(password) {
    const data = await request("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(password),
    });
    if (!data?.password) {
        throw new Error("The server did not return the created password");
    }
    return data.password;
}

export function updatePassword(id, password) {
    return request(`/api/passwords/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(password),
    });
}

export function deletePassword(id) {
    return request(`/api/passwords/${encodeURIComponent(id)}`, {
        method: "DELETE",
    });
}