import { useNavigate, Link } from "react-router-dom";
import { useRegisterStudent } from "../hooks/useRegisterStudent";
import StudentForm from "../components/StudentForm";

export default function StudentRegisterPage() {

    const navigate = useNavigate();

    const mutation = useRegisterStudent();

    const handleSubmit = (formData) => {

        mutation.mutate(formData, {

            onSuccess: () => {

                alert("Estudiante registrado correctamente");

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
                        Registrar Estudiante
                    </h2>

                    <small className="text-muted">
                        Crear usuario, membresía, identidad académica y perfil académico
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
                        mode="register"
                        onSubmit={handleSubmit}
                        loading={mutation.isPending}
                    />

                </div>

            </div>

        </div>
    );
}