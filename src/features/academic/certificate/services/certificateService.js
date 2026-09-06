import * as api from "../api/certificateApi";

export const certificateService = {

    getStudentCertificates: api.getStudentCertificates,
    getCertificate: api.getCertificate,
    getCertificateDetail: api.getCertificateDetail,
    issueCertificate: api.issueCertificate,
    revokeCertificate: api.revokeCertificate,
    updateCertificateCredential: api.updateCertificateCredential,
    updateCertificateDocument: api.updateCertificateDocument,
};