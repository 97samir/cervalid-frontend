// formulario de login

import { useState } from "react";
import { loginRequest } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../app/store/auth/useAuthStore";
import useRoleRedirect from "@/core/security/useRoleRedirect";

export default function LoginForm() {

  const redirectByRole = useRoleRedirect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loadUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest({
        email,
        password,
      });

      // multiples instituciones
      if (response.institutions?.length > 1) {
        navigate("/select-institution", {
          state: {
            institutions: response.institutions,
          },
        });
        return;
      }
      
      // caso 1 institución o SUPER_ADMIN
      const currentUser = await loadUser();

      redirectByRole(currentUser?.role)

    } catch (err) {
      setError("Credenciales incorrectas", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow">
      <h4 className="mb-3">Login</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100">Login</button>
    </form>
  );
}
