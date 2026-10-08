import { useState } from "react";

export default function VerificationSummaryFilters({ 
    filters, 
    onFilter 
}) {
    
    const [form, setForm] = useState(() => ({
        search: filters?.search ?? "",
        verificationType: filters?.verificationType ?? "",
        status: filters?.status ?? "",
        type: filters?.type ?? "",
        fromDate: filters?.fromDate ?? "",
        toDate: filters?.toDate ?? "",
    }));
    const handleChange = ({ target }) => {
        setForm((previous) => ({ 
            ...previous, [
                target.name
            ]: target.value 
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter({
            ...form,
            search: form.search?.trim() ?? "",
            verificationType: form.verificationType || "",
            status: form.status || "",
            type: form.type || "",
        });
    };
    const handleClear = () => {
        const empty = {
            search: "",
            verificationType: "",
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
            
            {/* BUSCAR */}
            <div className="col-lg-2">
                
                <label className="form-label"> Código o número </label>
                <input
                type="text"
                className="form-control"
                name="search"
                value={form.search}
                onChange={handleChange}
                placeholder="Código o número..."
                />
            </div>
            {/* TIPO DE REGISTRO */}
            <div className="col-lg-2">
                
                <label className="form-label"> Tipo de registro </label>
                <select
                className="form-select"
                name="verificationType"
                value={form.verificationType}
                onChange={handleChange}
                >
                
                <option value="">Todos</option>
                <option value="CERTIFICATE"> Certificados </option>
                <option value="CREDENTIAL"> Credenciales </option>
                </select>
            </div>
            {/* ESTADO */}
            <div className="col-lg-2">
                {" "}
                <label className="form-label"> Estado </label>
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
                </select>
            </div>
            {/* TIPO */}
            <div className="col-lg-2">
                
                <label className="form-label"> Tipo </label>
                <select
                className="form-select"
                name="type"
                value={form.type}
                onChange={handleChange}
                >
                
                <option value="">Todos</option>
                <optgroup label="Certificados">
                    
                    <option value="DEGREE"> Título </option>
                    <option value="CERTIFICATION"> Certificación </option>
                </optgroup>
                <optgroup label="Credenciales">
                    
                    <option value="BACHELOR_DEGREE"> Bachiller </option>
                    <option value="PROFESSIONAL_TITLE"> Título profesional </option>
                    <option value="MASTER_DEGREE"> Maestría </option>
                    <option value="DOCTORATE"> Doctorado </option>
                </optgroup>
                </select>
            </div>
            {/* DESDE */}
            <div className="col-lg-2">
                
                <label className="form-label"> Desde </label>
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
                
                <label className="form-label"> Hasta </label>
                <input
                type="date"
                className="form-control"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                />
            </div>
            </div>
            {/* BOTONES */}
            <div className="d-flex justify-content-end gap-2 mt-3">
            
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleClear}
            >
                
                Limpiar
            </button>
            <button type="submit" className="btn btn-primary">
                
                Buscar
            </button>
            </div>
        </div>
        </form>
    );
}
