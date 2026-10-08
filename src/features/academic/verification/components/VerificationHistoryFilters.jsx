
import { useState } from "react";

export default function VerificationHistoryFilters({
    filters,
    onFilter,
}) {
    const [form, setForm] = useState(() => ({
        search: filters?.search ?? "",
        status: filters?.status ?? "",
        verificationType: filters?.verificationType ?? "",
        fromDate: filters?.fromDate ?? "",
        toDate: filters?.toDate ?? "",
    }));

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
            search: form.search?.trim() ?? "",
            status: form.status || "",
            verificationType: form.verificationType || "",
        });
    };

    const handleClear = () => {
        const empty = {
            search: "",
            status: "",
            verificationType: "",
            fromDate: "",
            toDate: "",
        };

        setForm(empty);
        onFilter(empty);
    };

    return (
        <form
            className="card shadow-sm border-0 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="card-body">
                <div className="row g-3">

                    {/* BUSCAR 
                    <div className="col-lg-3">
                        <label className="form-label">
                            Código o número
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="search"
                            value={form.search}
                            onChange={handleChange}
                            placeholder="Código o número..."
                        />
                    </div>
                    */}

                    {/* TIPO DE VERIFICACIÓN 
                    <div className="col-lg-3">
                        <label className="form-label">
                            Tipo de registro
                        </label>

                        <select
                            className="form-select"
                            name="verificationType"
                            value={form.verificationType}
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            <option value="CERTIFICATE">
                                Certificados
                            </option>
                            <option value="CREDENTIAL">
                                Credenciales
                            </option>
                        </select>
                    </div>

                    */}

                    {/* ESTADO */}
                    <div className="col-lg-2">
                        <label className="form-label">
                            Estado
                        </label>

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
                            {/* <option value="NOT_FOUND">No encontrados</option> */}
                        </select>
                    </div>

                    {/* DESDE */}
                    <div className="col-lg-2">
                        <label className="form-label">
                            Desde
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="fromDate"
                            value={form.fromDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* HASTA */}
                    <div className="col-lg-2">
                        <label className="form-label">
                            Hasta
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="toDate"
                            value={form.toDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-lg-3"></div>

                    {/* BOTONES */}
                    <div className="col-lg-3">
                        <label htmlFor=""></label>
                        <div className="d-flex justify-content-end gap-2 mt-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleClear}
                            >
                                Limpiar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    

                </div>

                {/* BOTONES 
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleClear}
                    >
                        Limpiar
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Buscar
                    </button>
                </div>
                */}
            </div>
        </form>
    );
}
