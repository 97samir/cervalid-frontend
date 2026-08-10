export default function TranscriptStatistics({ transcript }) {

    const stats = [
        {
            label: "Cursos",
            value: transcript.coursesCount,
            icon: "bi-journal-text",
        },
        {
            label: "Promedio",
            value: transcript.gpa ?? "-",
            icon: "bi-graph-up",
        },
        {
            label: "Créditos",
            value: transcript.creditsEarned,
            icon: "bi-award",
        },
    ];

    return (
        <div className="row g-3">
        {stats.map((stat) => (
            <div key={stat.label} className="col-md-4">
                <div className="card border-0 bg-light h-100">
                    <div className="card-body text-center">

                        <i className={`bi ${stat.icon} text-primary fs-4`} />
                        <div className="mt-2 text-muted small">{stat.label}</div>
                        <div className="fs-4 fw-bold">{stat.value}</div>

                    </div>
                </div>
            </div>
        ))}
        </div>
    );
}

