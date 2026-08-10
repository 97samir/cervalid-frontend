import { useEffect, useState } from "react";
import { getMyInstitution } from "../api/institutionApi";

const InstitutionProfilePage = () => {

    const [institution, setInstitution] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await getMyInstitution();

                if (isMounted) {
                    setInstitution(data);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };

    }, []);

    if (!institution) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <h3>Perfil de Institución</h3>

            <div className="card p-3">

                <p><strong>Nombre:</strong> {institution.name}</p>
                <p><strong>RUC:</strong> {institution.ruc}</p>
                <p><strong>Tipo:</strong> {institution.type}</p>
                <p><strong>Ubicación:</strong> {institution.country} - {institution.city}</p>
                <p><strong>Dirección:</strong> {institution.address}</p>

                <hr />

                <p><strong>Presencia digital:</strong> {institution.tienePresenciaDigital ? "Sí" : "No"}</p>

                {institution.tienePresenciaDigital && (
                    <>
                        <p><strong>Website:</strong> {institution.website}</p>
                        <p><strong>Descripción:</strong> {institution.description}</p>
                        <p><strong>Email institucional:</strong> {institution.institutionalEmail}</p>
                        <p><strong>Dominio:</strong> {institution.institutionalDominio}</p>
                    </>
                )}

            </div>
        </div>
    );
};

export default InstitutionProfilePage;