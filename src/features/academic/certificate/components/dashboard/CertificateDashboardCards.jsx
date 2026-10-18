const cards = [
    {
        key: "total",
        title: "Total de certificados",
        icon: "bi-award",
        color: "primary",
    },
    {
        key: "issued",
        title: "Emitidos",
        icon: "bi-patch-check",
        color: "success",
    },
    {
        key: "drafts",
        title: "Borradores",
        icon: "bi-file-earmark",
        color: "warning",
    },
    {
        key: "revoked",
        title: "Revocados",
        icon: "bi-shield-x",
        color: "danger",
    },
];

export default function CertificateDashboardCards({ summary, loading }) {
    return (
        <div className="row g-3 mb-4">
        {cards.map((card) => (
            <div className="col-12 col-sm-6 col-xl-3" key={card.key}>
            <div className="card h-100 border-0 shadow-sm certificate-dashboard-card">
                <div className="card-body d-flex align-items-center gap-3">
                <div
                    className={`certificate-dashboard-card-icon text-${card.color} bg-${card.color}-subtle`}
                >
                    <i className={`bi ${card.icon}`} />
                </div>

                <div className="min-w-0">
                    <p className="text-muted small mb-1">{card.title}</p>

                    <h3 className="fw-semibold mb-0">
                    {loading
                        ? "—"
                        : (summary?.[card.key] ?? 0).toLocaleString("es-PE")}
                    </h3>
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
}
