import React from "react";
import { apiClient } from "../core/api/apiClient";
import { tokenManager } from "../core/security/tokenManager";
import { decodeJWT } from "../core/security/jwtDecoder";
import { useAuthStore } from "../app/store/authStore";

export default function TestApiPage() {
  const { user, loginUser } = useAuthStore();

  const handleTestLoginToken = async () => {
    const fakeToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiSU5TVElUVVRJT05fQURNSU4iLCJpbnN0aXR1dGlvbklkIjoxLCJ1c2VySWQiOjQsInN1YiI6ImFkbWluQGluc3RpdHVjaW9uQS5jb20iLCJpYXQiOjE3NzExOTUxNDUsImV4cCI6MTc3MTE5ODc0NX0.VkB12UW5ZDmPWvgni4WCEpshTZxl7WdnY3Z0eVdFVc4";

    // 1. Guardar token
    tokenManager.setToken(fakeToken);

    // 2. Decodificar inmediatamente (simula login real)
    const decoded = decodeJWT(fakeToken);

    // 3. Actualizar estado global SIN recargar
    loginUser({
      email: decoded.sub,
      role: decoded.role,
      tenantId: decoded.tenantId || decoded.institutionId,
    });

    alert("Token guardado y usuario cargado sin recargar 🚀");
  };

  const handleCallProtectedEndpoint = async () => {
    try {
      const response = await apiClient.get("/auth/me");
      console.log("Respuesta del backend:", response);
      alert("Mira la consola (F12)");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Prueba API Client + JWT + AuthProvider</h2>

      <button onClick={handleTestLoginToken}>
        1️⃣ Guardar token manual
      </button>

      <br /><br />

      <button onClick={handleCallProtectedEndpoint}>
        2️⃣ Llamar endpoint protegido (/auth/me)
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>👤 Usuario autenticado (desde JWT)</h3>

      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>Tenant / Institución ID:</strong> {user.tenantId}</p>
        </div>
      ) : (
        <p>No hay usuario autenticado</p>
      )}
    </div>
  );
}
