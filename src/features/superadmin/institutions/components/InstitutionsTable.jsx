import InstitutionStatusToggle from "./InstitutionStatusToggle";
import useInstitutionContext from "../../../../core/hooks/useInstitutionContext";

const InstitutionsTable = ({ institutions, refresh }) => {

    const { enterInstitution } = useInstitutionContext();

    if (!institutions || institutions.length === 0) {
        return <p className="text-center mt-3">No hay instituciones</p>;
    }
    
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>RUC</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {(institutions || []).map(inst => (
                    <tr key={inst.id}>
                        <td>{inst.name}</td>
                        <td>{inst.ruc}</td>

                        <td>
                            {inst.active ? "Activa" : "Inactiva"}
                        </td>

                        <td>
                            <InstitutionStatusToggle
                                institution={inst}
                                refresh={refresh}
                            />

                            <button 
                                className="btn btn-sm btn-dark ms-2"
                                onClick={() => enterInstitution(inst)}
                            >
                                Entrar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InstitutionsTable;