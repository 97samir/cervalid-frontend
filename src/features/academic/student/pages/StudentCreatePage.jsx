import { useNavigate, Link } from "react-router-dom";
import { useCreateStudent } from "../hooks/useCreateStudent";
import StudentForm from "../components/StudentForm";

export default function StudentCreatePage() {

    const navigate = useNavigate();

    const mutation = useCreateStudent();

    const handleSubmit = (formData) => {

        mutation.mutate(formData, {

            onSuccess: () => {

                alert("Estudiante creado correctamente");

                navigate("/institution/students");
            }
        });
    };

    return (

        <div className="container-fluid">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="mb-0">
                        Asociar Usuario Existente
                    </h2>

                    <small className="text-muted">
                        Crear identidad académica para un usuario ya registrado
                    </small>

                </div>

                <Link
                    to="/institution/students"
                    className="btn btn-outline-secondary"
                >
                    Volver
                </Link>

            </div>

            {/* Formulario */}

            <div className="card shadow-sm">

                <div className="card-body">

                    <StudentForm
                        mode="create"
                        onSubmit={handleSubmit}
                        loading={mutation.isPending}
                    />

                </div>

            </div>

        </div>
    );
}