export default function VerificationDashboardCards({ dashboard }) {

    const cards = [

        {
        title: "Total verificaciones",
        value: dashboard.totalVerifications,
        icon: "bi-shield-check",
        color: "primary",
        },

        {
        title: "Certificados consultados",
        value: dashboard.uniqueCertificates,
        icon: "bi-award",
        color: "success",
        },

        {
        title: "Hoy",
        value: dashboard.today,
        icon: "bi-calendar-day",
        color: "warning",
        },

        {
        title: "Esta semana",
        value: dashboard.last7Days,
        icon: "bi-calendar-week",
        color: "info",
        },

        // {
        // title: "Este mes",
        // value: dashboard.last30Days,
        // icon: "bi-calendar-week",
        // color: "info",
        // },

        {
        title: "Verificaciones válidas",
        value: dashboard.validRate + "%",
        icon: "bi-check-circle",
        color: "success",
        },

        {
        title: "Verificaciones fallidas",
        value: dashboard.invalidRate + "%",
        icon: "bi-x-circle",
        color: "danger",
        },
    ];

    return (
        <div className="row mb-4">
        {cards.map((card) => (
            <div key={card.title} className="col-lg-2 col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                <div className={`text-${card.color} mb-3`}>
                    <i className={`bi ${card.icon} fs-3`} />
                </div>

                <div className="text-muted small">{card.title}</div>

                <h3 className="fw-bold mb-0">{card.value}</h3>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
}
