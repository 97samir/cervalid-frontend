import * as api from "../api/verificationApi";

const cleanHistoryFilters = (filters = {}) => {
    return {
        ...(filters.verificationType && {
        verificationType: filters.verificationType,
        }),

        ...(filters.search?.trim() && {
        search: filters.search.trim(),
        }),

        ...(filters.status && {
        status: filters.status,
        }),

        ...(filters.type && {
        type: filters.type,
        }),

        ...(filters.fromDate && {
        fromDate: filters.fromDate,
        }),

        ...(filters.toDate && {
        toDate: filters.toDate,
        }),

        ...(filters.resourcePublicId && {
        resourcePublicId: filters.resourcePublicId,
        }),
    };
};

export const verificationService = {
    
    // certificate
    verifyCertificate(payload) {
        return api.verifyCertificate(payload);
    },

    getPublicCertificateVerification(certificatePublicId) {
        return api.getPublicCertificateVerification(certificatePublicId);
    },

    getPublicCertificateTimeline(certificatePublicId) {
        return api.getPublicCertificateTimeline(certificatePublicId);
    },

    // credential
    verifyCredential(payload) {
        return api.verifyCredential(payload);
    },

    getPublicCredentialVerification(credentialPublicId) {
        return api.getPublicCredentialVerification(credentialPublicId);
    },

    getPublicCredentialTimeline(credentialPublicId) {
        return api.getPublicCredentialTimeline(credentialPublicId);
    },

    // history
    searchVerificationHistory(page, size, filters) {
        return api.searchVerificationHistory(
        page,
        size,
        cleanHistoryFilters(filters),
        );
    },

    // dashboard
    getVerificationDashboard() {
        return api.getVerificationDashboard();
    },

    // summary
    searchVerificationSummary(page, size, filters) {
        return api.searchVerificationSummary(
        page,
        size,
        cleanHistoryFilters(filters),
        );
    },
};
