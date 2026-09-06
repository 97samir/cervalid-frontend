const stats = [
    {
        value: "50+",
        label: "Instituciones",
        icon: "bi-building",
    },
    {
        value: "15K+",
        label: "Estudiantes",
        icon: "bi-mortarboard",
    },
    {
        value: "40K+",
        label: "Certificados",
        icon: "bi-file-earmark-check",
    },
    {
        value: "100%",
        label: "Verificables",
        icon: "bi-patch-check",
    },
];

export default function PlatformStats() {
    return (
        <section className="platform-stats-section">
        <div className="container">
            <div className="platform-stats">
            {stats.map((stat) => (
                <div className="platform-stat" key={stat.label}>
                <div className="platform-stat-icon">
                    <i className={`bi ${stat.icon}`}></i>
                </div>

                <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
