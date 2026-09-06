import { Link } from "react-router-dom";

export default function AdminDashboardStats({ stats }) {
    
    const indicators = [
        {
        label: "Total instituciones",
        value: stats?.totalInstitutions ?? 0,
        icon: "bi-building",
        description: "Instituciones registradas",
        path: "/superadmin/institutions",
        },
        {
        label: "Instituciones activas",
        value: stats?.activeInstitutions ?? 0,
        icon: "bi-building-check",
        description: "Instituciones operativas",
        path: "/superadmin/institutions",
        },
        {
        label: "Solicitudes pendientes",
        value: stats?.pendingRequests ?? 0,
        icon: "bi-hourglass-split",
        description: "Solicitudes por revisar",
        path: "/superadmin/institution-requests",
        },
        {
        label: "Total usuarios",
        value: stats?.totalUsers ?? 0,
        icon: "bi-people",
        description: "Usuarios registrados",
        path: "/superadmin/users",
        },
    ];

    return (
        <>
        <style>
            {`
                        .dashboard-stat-link {
                            text-decoration: none;
                            color: inherit;
                        }

                        .dashboard-stat-card {
                            transition:
                                transform 0.2s ease,
                                box-shadow 0.2s ease;
                        }

                        .dashboard-stat-link:hover .dashboard-stat-card {
                            transform: translateY(-3px);
                            box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .10) !important;
                        }

                        .dashboard-stat-arrow {
                            opacity: 0;
                            transform: translateX(-4px);
                            transition:
                                opacity 0.2s ease,
                                transform 0.2s ease;
                        }

                        .dashboard-stat-link:hover .dashboard-stat-arrow {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    `}
        </style>

        <div className="row g-4 mb-4">
            {indicators.map((item) => (
            <div className="col-12 col-sm-6 col-xl-3" key={item.label}>
                <Link to={item.path} className="dashboard-stat-link d-block h-100">
                <div className="card border-0 shadow-sm h-100 dashboard-stat-card">
                    <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                        <p className="text-muted small mb-2">{item.label}</p>

                        <h3 className="fw-bold mb-1">{item.value}</h3>

                        <div className="d-flex align-items-center gap-2">
                            <span className="text-muted small">
                            {item.description}
                            </span>

                            <i className="bi bi-arrow-right small dashboard-stat-arrow"></i>
                        </div>
                        </div>

                        <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary flex-shrink-0"
                        style={{
                            width: "44px",
                            height: "44px",
                        }}
                        >
                        <i className={`bi ${item.icon} fs-5`}></i>
                        </div>
                    </div>
                    </div>
                </div>
                </Link>
            </div>
            ))}
        </div>
        </>
    );
}
