const InstitutionRequestTable = ({ requests, onApprove, onReject }) => {

    const getBadge = (status) => {
        switch (status) {
            case "PENDING":
                return "warning";
            case "APPROVED":
                return "success";
            case "REJECTED":
                return "danger";
            default:
                return "secondary";
        }
    };

    return (
        <div className="table-responsive">

            <table className="table table-bordered table-hover">

                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Institución</th>
                        <th>RUC</th>
                        <th>Solicitante</th>
                        <th>Email</th>
                        <th>DNI / CE</th>
                        <th>Doc. Acreditación</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.id}</td>
                            <td>{req.institutionName}</td>
                            <td>{req.ruc}</td>
                            <td>{req.name} {req.lastName}</td>
                            <td>{req.contactEmail}</td>
                            <td>{req.document}</td>
                            <td>{req.documentAcreditationUrl}</td>

                            <td>
                                <span className={`badge bg-${getBadge(req.status)}`}>
                                    {req.status}
                                </span>
                            </td>

                            <td>
                                {req.status === "PENDING" && (
                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => onApprove(req.id)}
                                        >
                                            Aprobar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onReject(req.id)}
                                        >
                                            Rechazar
                                        </button>

                                    </div>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default InstitutionRequestTable;