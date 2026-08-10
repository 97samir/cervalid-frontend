export default function StudentDashboardPage() {

    return (

        <div className="container-fluid">
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="fw-bold mb-1">Dashboard Académico</h2>

                    <p className="text-muted mb-0">
                        Gestión y seguimiento de estudiantes de la institución.
                    </p>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                        <h6 className="text-muted">Estudiantes Activos</h6>

                        <h2 className="fw-bold mb-0">0</h2>
                    </div>
                </div>
                </div>

                <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                        <h6 className="text-muted">Pendientes de Activación</h6>

                        <h2 className="fw-bold mb-0">0</h2>
                    </div>
                </div>
                </div>

                <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                        <h6 className="text-muted">Graduados</h6>

                        <h2 className="fw-bold mb-0">0</h2>
                    </div>
                </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="text-muted">Suspendidos</h6>

                            <h2 className="fw-bold mb-0">0</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
