const cards = [
    {
        key: "total",
        title: "Total de credenciales",
        icon: "bi bi-award",
        color: "primary",
    },
    {
        key: "issued",
        title: "Emitidas",
        icon: "bi bi-patch-check",
        color: "success",
    },
    {
        key: "drafts",
        title: "Borradores",
        icon: "bi bi-file-earmark",
        color: "warning",
    },
    {
        key: "revoked",
        title: "Revocadas",
        icon: "bi bi-slash-circle",
        color: "danger",
    },
];

export default function CredentialDashboardCards({ 
    summary, 
    loading = false 
}) {
    
    return (
        <div className="row g-3 mb-4">
        {cards.map((card) => (
            <div className="col-12 col-sm-6 col-xl-3" key={card.key}>
            <div className="card credential-dashboard-card h-100">
                <div className="card-body d-flex align-items-center gap-3">
                <div
                    className={`credential-dashboard-icon text-bg-${card.color}`}
                >
                    <i className={card.icon} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                    <p className="text-secondary small mb-1">{card.title}</p>

                    <h3 className="mb-0 fw-semibold">
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
