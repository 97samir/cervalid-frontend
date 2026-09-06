export default function FraudProblemSection() {
    return (
        <section className="companies-problem section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">EL PROBLEMA</span>

            <h2>Contratar también requiere verificar.</h2>

            <p>
                Las empresas necesitan confiar en la información académica
                presentada por los candidatos.
            </p>
            </div>

            <div className="row g-4 mt-4">
            <div className="col-md-4">
                <div className="problem-card">
                <div className="problem-icon">
                    <i className="bi bi-file-earmark-x"></i>
                </div>

                <h3>Credenciales falsificadas</h3>

                <p>
                    Los documentos académicos pueden ser modificados o presentados
                    de manera fraudulenta.
                </p>
                </div>
            </div>

            <div className="col-md-4">
                <div className="problem-card">
                <div className="problem-icon">
                    <i className="bi bi-hourglass-split"></i>
                </div>

                <h3>Verificación lenta</h3>

                <p>
                    Confirmar manualmente un certificado puede requerir correos,
                    llamadas y procesos administrativos.
                </p>
                </div>
            </div>

            <div className="col-md-4">
                <div className="problem-card">
                <div className="problem-icon">
                    <i className="bi bi-question-circle"></i>
                </div>

                <h3>Falta de certeza</h3>

                <p>
                    Una empresa necesita saber si la credencial presentada
                    corresponde realmente a una institución.
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
