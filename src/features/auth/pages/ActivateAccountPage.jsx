import ActivateAccountForm from "../components/ActivateAccountForm";
import "../styles/auth.css";

export default function ActivateAccountPage() {
    return (
        <div className="auth-page">
        <div className="auth-card-wrapper auth-card-wide">
            <div className="auth-page-heading">
            <div className="auth-page-icon">
                <i className="bi bi-person-check-fill"></i>
            </div>

            <h1>Activa tu cuenta</h1>

            <p>Completa tus datos para comenzar a utilizar Cervalid</p>
            </div>

            <ActivateAccountForm />
        </div>
        </div>
    );
}
