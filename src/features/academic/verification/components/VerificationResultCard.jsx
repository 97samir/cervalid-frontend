import VerificationStatusBanner from "./result/VerificationStatusBanner";
import VerificationHighlights from "./result/VerificationHighlights";
import VerificationAcademicInfo from "./result/VerificationAcademicInfo";
import VerificationResourceInfo from "./result/VerificationResourceInfo";
import VerificationDocumentIntegrity from "./result/VerificationDocumentIntegrity";
import VerificationRecordIntegrity from "./result/VerificationRecordIntegrity";
import VerificationTimeline from "./result/VerificationTimeline";
import VerificationPublicLink from "./result/VerificationPublicLink";
import VerificationTrust from "./result/VerificationTrust";

import "../styles/verification.css";

export default function VerificationResultCard({ result }) {
    console.log("VerificationResultCard:", result);
    if (!result) {
        return null;
    }

    return (
        <div className="verification-result-wrapper">
        <div className="card verification-result border-0 shadow-sm">
            <VerificationStatusBanner result={result} />

            <div className="card-body p-4 p-lg-5">
            <VerificationHighlights result={result} />

            <div className="row g-4 mt-2">
                <div className="col-12 col-lg-7">
                <VerificationAcademicInfo result={result} />
                </div>

                <div className="col-12 col-lg-5">
                <VerificationResourceInfo result={result} />
                </div>
            </div>

            <div className="row g-4 mt-2">
                <div className="col-12 col-lg-7">
                <VerificationDocumentIntegrity result={result} />
                </div>

                <div className="col-12 col-lg-5">
                <VerificationRecordIntegrity result={result} />
                </div>
            </div>

            <VerificationTimeline result={result} />

            <VerificationPublicLink result={result} />

            <VerificationTrust />
            </div>
        </div>
        </div>
    );
}
