import { academicProgramLabels } from "@/shared/utils/enumUtils";

export default function CertificateDashboardFilters({
    filters,
    onChange,
    onSubmit,
    onClear,
}) {
    const programOptions = Object.entries(academicProgramLabels);

    const updateField = (field, value) => {
        onChange({
        ...filters,
        [field]: value,
        });
    };

    return (
        <form
        className="card border-0 shadow-sm mb-4"
        onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
        }}
        >
            <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <div>
                        <h5 className="mb-1">Filtros</h5>
                        {/* <p className="text-muted small mb-0">
                        Encuentra certificados según sus datos.
                        </p> */}
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Número de certificado</label>
                        <input
                        className="form-control"
                        value={filters.certificateNumber}
                        onChange={(event) =>
                            updateField("certificateNumber", event.target.value)
                        }
                        placeholder="Buscar por número"
                        />
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Código de estudiante</label>
                        <input
                        className="form-control"
                        value={filters.studentCode}
                        onChange={(event) =>
                            updateField("studentCode", event.target.value)
                        }
                        placeholder="Buscar por código"
                        />
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Programa académico</label>
                        <select
                        className="form-select"
                        value={filters.program}
                        onChange={(event) => updateField("program", event.target.value)}
                        >
                        <option value="">Todos los programas</option>

                        {programOptions.map(([value, label]) => (
                            <option key={value} value={value}>
                            {label}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Tipo de certificado</label>
                        <input
                        className="form-control"
                        value={filters.type}
                        onChange={(event) => updateField("type", event.target.value)}
                        placeholder="Valor del tipo, por ejemplo DEGREE"
                        />
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Estado</label>
                        <select
                        className="form-select"
                        value={filters.status}
                        onChange={(event) => updateField("status", event.target.value)}
                        >
                        <option value="">Todos los estados</option>
                        <option value="DRAFT">Borrador</option>
                        <option value="ISSUED">Emitido</option>
                        <option value="VERIFIED">Verificado</option>
                        <option value="REVOKED">Revocado</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Fecha de emisión desde</label>
                        <input
                        type="date"
                        className="form-control"
                        value={filters.fromDate}
                        onChange={(event) => updateField("fromDate", event.target.value)}
                        />
                    </div>

                    {/* <div className="col-12 col-md-6 col-xl-4">
                        <label className="form-label">Fecha de emisión hasta</label>
                        <input
                        type="date"
                        className="form-control"
                        value={filters.toDate}
                        min={filters.fromDate || undefined}
                        onChange={(event) => updateField("toDate", event.target.value)}
                        />
                    </div> */}
                </div>

                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onClear}
                    >
                        <i className="bi bi-arrow-counterclockwise me-2" />
                        Limpiar
                    </button>

                    <button type="submit" className="btn btn-primary">
                        <i className="bi bi-search me-2" />
                        Buscar certificados
                    </button>
                </div>
            </div>
        </form>
    );
}
