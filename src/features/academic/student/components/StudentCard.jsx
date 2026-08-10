import StudentStatusBadge from "./StudentStatusBadge";

export default function StudentCard({ student }) {

    return (
        <div className="card p-3 mb-2">

            <h5>{student.studentCode}</h5>

            <StudentStatusBadge status={student.status} />

            <p>Institution: {student.institutionId}</p>

        </div>
    );
}