import { useParams } from "react-router-dom";
import VerificationResultCard from "../components/VerificationResultCard";
import { useVerifyPublicCertificate } from "../hooks/useVerifyPublicCertificate";

export default function PublicCertificateVerificationPage() {
    
    const { certificatePublicId } = useParams();

    console.log("UUID:", certificatePublicId);

    const { data, error, isLoading } =
        useVerifyPublicCertificate(certificatePublicId);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (isLoading) {
        return <h3>Verificando...</h3>;
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            Error:
            {error.message}
        </div>
        );
    }

    return (
        <div className="container mt-5">
        <VerificationResultCard result={data} />
        </div>
    );
}
