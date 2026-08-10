import { useState } from "react";
import useAuthStore from "@/app/store/auth/useAuthStore";

export default function StudentFilters({
    //filters,
    onSearch,
    onClear
}) {

    const { user } = useAuthStore();

    const [localFilters, setLocalFilters] = useState({
        studentCode: "",
        status: "",
        institutionId: user?.institutionId || ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // filtro
        if (onSearch) {
            onSearch({
                ...localFilters,
                institutionId: user?.institutionId // forzado desde sesión
            });
        }
    };

    const handleClear = () => {

        const reset = {
            studentCode: "",
            status: "",
            institutionId: user?.institutionId || ""
        };

        setLocalFilters(reset);

        if (onClear) {
            onClear(reset);
        }
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">

                <h5 className="mb-3">
                    Filtros de búsqueda
                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="row g-3 align-items-end">

                        {/* Código */}
                        <div className="col-md-4">

                            <label className="form-label">
                                Código estudiante
                            </label>

                            <input
                                type="text"
                                name="studentCode"
                                className="form-control"
                                placeholder="Ej: 20260001"
                                value={localFilters.studentCode}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Estado */}
                        <div className="col-md-4">

                            <label className="form-label">
                                Estado
                            </label>

                            <select
                                name="status"
                                className="form-select"
                                value={localFilters.status}
                                onChange={handleChange}
                            >
                                <option value=""> Todos </option>
                                <option value="ACTIVE"> Activo </option>
                                <option value="PENDING_ACTIVATION"> Pendiente </option>
                                <option value="INACTIVE"> Inactivo </option>
                            </select>
                        </div>

                        {/* BOTONES */}

                        <div className="col-md-4">

                            <div className="d-flex gap-2 mt-4">

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Buscar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleClear}
                                >
                                    Limpiar
                                </button>

                            </div>

                        </div>                            

                    </div>
                    
                    {/* Institución OCULTA (controlada por sesión) */}
                    <input
                        type="hidden"
                        name="institutionId"
                        value={user?.institutionId || ""}
                    />

                </form>

            </div>
        </div>
    );
}