// pantalla completa de login

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div style={{ width: "400px" }}>
        <LoginForm />
      </div>
    </div>
  );
}
