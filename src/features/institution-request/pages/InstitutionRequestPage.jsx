import InstitutionRequestForm from "../components/InstitutionRequestForm";
import "../styles/institutionRequest.css";

export default function InstitutionRequestPage() {

    return (
        <div className="institution-request-page">
        <div className="container">
            <div className="institution-request-wrapper">
            {/* HEADER */}
            <header className="institution-request-header">
                <div className="institution-request-icon">
                <i className="bi bi-building-add" aria-hidden="true"></i>
                </div>

                <div>
                <h1>Registrar institución</h1>

                <p>
                    Solicita acceso a Cervalid para gestionar certificaciones
                    académicas verificables.
                </p>
                </div>
            </header>

            {/* FORM */}
            <InstitutionRequestForm />
            </div>
        </div>
        </div>
    );
};

