import { useState } from "react";
import { Link } from "react-router-dom";

import { useStudents } from "../hooks/useStudents";
import { useDeleteStudent } from "../hooks/useDeleteStudent";

import StudentTable from "../components/StudentTable";
import StudentFilters from "../components/StudentFilters";
import StudentEditModal from "../components/StudentEditModal";

export default function StudentListPage() {

    const [filters, setFilters] = useState(null);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const {
        data,
        isLoading,
        error
    } = useStudents(filters);

    const deleteMutation = useDeleteStudent();

    const handleDelete = (publicId) => {

        const confirmed = window.confirm(
            "¿Desea desactivar este estudiante?"
        );

        if (!confirmed) return;

        deleteMutation.mutate(publicId);
    };

    const handleEdit = (student) => {

        setSelectedStudent(student);
    };

    const handleCloseEdit = () => {

        setSelectedStudent(null);
    };

    // Filtros

    const handleSearch = (filterData) => {

        setFilters(filterData);
    };

    const handleClear = () => {

        setFilters(null);
    };

    if (isLoading) {

        return (
            <div className="d-flex justify-content-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

            </div>
        );
    }

    if (error) {

        return (
            <div className="alert alert-danger shadow-sm">
                Error cargando estudiantes
            </div>
        );
    }

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="mb-0">
                        Estudiantes
                    </h2>

                    <small className="text-muted">
                        Gestión de identidad académica
                    </small>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        to="/institution/students/register"
                        className="btn btn-primary"
                    >
                        <i className="bi bi-person-plus me-2"></i>
                        Registrar
                    </Link>

                    <Link
                        to="/institution/students/create"
                        className="btn btn-outline-primary"
                    >
                        <i className="bi bi-person-check me-2"></i>
                        Asociar usuario
                    </Link>

                </div>

            </div>

            {/* FILTROS */}

            <StudentFilters
                onSearch={handleSearch}
                onClear={handleClear}
            />

            {/* TABLA */}

            <div className="card shadow-sm p-0">

                <div className="card-body">

                    <StudentTable
                        students={data?.content || []}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />

                </div>

            </div>

            {/* PAGINACIÓN */}

            {data && (

                <div className="d-flex justify-content-between align-items-center mt-3">

                    <span className="text-muted">

                        Total:
                        {" "}
                        <strong>
                            {data.totalElements}
                        </strong>

                    </span>

                    <span className="text-muted">

                        Página
                        {" "}
                        <strong>
                            {data.number + 1}
                        </strong>
                        {" "}
                        de
                        {" "}
                        <strong>
                            {data.totalPages}
                        </strong>

                    </span>

                </div>

            )}

            {/* MODAL DE EDICIÓN */}

            <StudentEditModal
                student={selectedStudent}
                onClose={handleCloseEdit}
            />

        </div>
    );
}