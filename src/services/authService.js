import API from "./axiosInstance";

// ── Registration ──────────────────────────────────────────────
// POST /api/register/employee  →  { token }
export const registerEmployee = (data) =>
  API.post("/api/register/employee", data);

// POST /api/register/admin     →  { token }
export const registerAdmin = (data) =>
  API.post("/api/register/admin", data);

// ── Sign In (placeholder — wire up when backend is ready) ─────
// POST /api/auth/login
export const signIn = (data) =>
  API.post("/api/auth/login", data);