// muestra indicadores clave de la pagina

export default function DashboardStats({ stats }) {
    return (
        
        <div className="row">

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                <h5>Total usuarios</h5>
                <h2>{stats.totalUsers}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                <h5>Total estudiantes</h5>
                <h2>{stats.totalStudents}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                <h5>Total administradores</h5>
                <h2>{stats.totalAdmins}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                <h5>Certificados emitidos</h5>
                <h2>{stats.totalCertificates}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                <h5>Certificados verificados</h5>
                <h2>{stats.totalVerified}</h2>
                </div>
            </div>

        </div>
    );
}
