import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card-wrapper">
        <div className="auth-page-heading">
          <h1>Iniciar sesión</h1>

          <p>Accede a tu cuenta de Cervalid</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
