import InstitutionRequestForm from "../components/InstitutionRequestForm";

const InstitutionRequestPage = () => {
    return (
        <div className="container mt-5">

        <div className="row justify-content-center">
            <div className="col-md-8">

            {/* header */}
            <div className="text-center mb-4">
                <h2>Registrar institución</h2>
                <p className="text-muted">
                Solicita acceso a Cervalid para gestionar certificaciones académicas verificables.
                </p>
            </div>

            {/* formulario */}
            <InstitutionRequestForm />

            </div>
        </div>

        </div>
    );
};

export default InstitutionRequestPage;