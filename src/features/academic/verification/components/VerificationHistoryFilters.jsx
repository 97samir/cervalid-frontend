import { useEffect, useState } from "react";

export default function VerificationHistoryFilters({ 
    filters, 
    onFilter 
}) {
    const [form, setForm] = useState(filters);

    useEffect(() => {
        setForm(filters);
    }, [filters]);

    const handleChange = ({ target }) => {
        setForm((previous) => ({
        ...previous,
        [target.name]: target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onFilter({
        ...form,
        status: form.status || "",
        });
    };

    const handleClear = () => {
        const empty = {
        search: "",
        status: "",
        type: "",
        fromDate: "",
        toDate: "",
        };

        setForm(empty);

        onFilter(empty);
    };

    return (
        <form className="card shadow-sm border-0 mb-4" onSubmit={handleSubmit}>
        <div className="card-body">
            <div className="row g-3">
            <div className="col-lg-4">
                <label className="form-label">Certificado</label>

                <input
                className="form-control"
                name="search"
                placeholder="Número de certificado..."
                value={form.search}
                onChange={handleChange}
                />
            </div>

            <div className="col-lg-2">
                <label className="form-label">Estado</label>

                <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={handleChange}
                >
                <option value="">Todos</option>

                <option value="VALID">Válidos</option>

                <option value="INVALID">Inválidos</option>

                <option value="REVOKED">Revocados</option>

                <option value="NOT_FOUND">No encontrados</option>
                </select>
            </div>

            <div className="col-lg-2">
                <label className="form-label">Desde</label>

                <input
                type="date"
                className="form-control"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                />
            </div>

            <div className="col-lg-2">
                <label className="form-label">Hasta</label>

                <input
                type="date"
                className="form-control"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                />
            </div>

            <div className="col-lg-2 d-flex align-items-end gap-2">
                <button
                type="button"
                className="btn btn-outline-secondary flex-fill"
                onClick={handleClear}
                >
                Limpiar
                </button>

                <button type="submit" className="btn btn-primary flex-fill">
                Buscar
                </button>
            </div>
            </div>
        </div>
        </form>
    );
}
