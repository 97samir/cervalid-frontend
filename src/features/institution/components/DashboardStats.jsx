import { Link } from "react-router-dom";

// muestra indicadores clave de la página

export default function DashboardStats({ stats }) {

    const indicators = [
        {
            label: "Total usuarios",
            value: stats?.totalUsers ?? 0,
            icon: "bi-people",
            description: "Usuarios registrados",
            to: "/institution/users",
        },
        {
            label: "Total estudiantes",
            value: stats?.totalStudents ?? 0,
            icon: "bi-mortarboard",
            description: "Estudiantes registrados",
            to: "/institution/students",
        },
        {
            label: "Administradores",
            value: stats?.totalAdmins ?? 0,
            icon: "bi-person-badge",
            description: "Administradores registrados",
            to: "/institution/users",
        },
        {
            label: "Certificados emitidos",
            value: stats?.totalCertificates ?? 0,
            icon: "bi-award",
            description: "Certificados generados",
            to: "/institution/certificates",
        },
        {
            label: "Certificados verificados",
            value: stats?.totalVerified ?? 0,
            icon: "bi-patch-check",
            description: "Verificaciones realizadas",
            to: "/institution/verification/history",
        },
    ];

    return (
        <div className="row g-4 mb-4">

            {indicators.map((item) => (
                <div
                    className="col-12 col-sm-6 col-xl-3"
                    key={item.label}
                >
                    <Link
                        to={item.to}
                        className="text-decoration-none text-reset"
                    >
                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                cursor: "pointer",
                                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                e.currentTarget.classList.add("shadow");
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.classList.remove("shadow");
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted small mb-2">
                                            {item.label}
                                        </p>

                                        <h3 className="fw-bold mb-1">
                                            {item.value}
                                        </h3>

                                        <span className="text-muted small">
                                            {item.description}
                                        </span>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                        }}
                                    >
                                        <i
                                            className={`bi ${item.icon} fs-5`}
                                        ></i>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <span className="text-primary small">
                                        Ver detalle
                                        <i className="bi bi-arrow-right ms-1"></i>
                                    </span>
                                </div>

                            </div>

                        </div>
                    </Link>
                </div>
            ))}

        </div>
    );
}