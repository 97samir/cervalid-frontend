export default function AdminDashboardStats({ stats }) {
    return (
        <div className="row">

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                    <h5>Total Instituciones</h5>
                    <h2>{stats.totalInstitutions}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                    <h5>Instituciones Activas</h5>
                    <h2>{stats.activeInstitutions}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                    <h5>Solicitudes Pendientes</h5>
                    <h2>{stats.pendingRequests}</h2>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow-sm text-center p-3">
                    <h5>Total Usuarios</h5>
                    <h2>{stats.totalUsers}</h2>
                </div>
            </div>

        </div>
    );
}