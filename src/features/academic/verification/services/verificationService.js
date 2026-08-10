import * as api from "../api/verificationApi";

const cleanHistoryFilters = (filters = {}) => {

    return {
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
    };
};

export const verificationService = {

    verifyCertificate(payload) {
        return api.verifyCertificate(payload);
    },

    searchInstitutionVerificationHistory(page, size, filters) {
        const cleanFilters = cleanHistoryFilters(filters);

        return api.searchInstitutionVerificationHistory(page, size, cleanFilters);
    },

    getCertificateVerificationHistory(certificatePublicId) {
        return api.getCertificateVerificationHistory(certificatePublicId);
    },

    verifyPublicCertificate(certificatePublicId) {
        return api.getPublicVerification(certificatePublicId);
    },

    getVerificationDashboard() {
        return api.getVerificationDashboard();
    },

    searchVerificationSummary(page, size, filters) {
        const cleanFilters = cleanHistoryFilters(filters);
        return api.searchVerificationSummary(page, size, cleanFilters);
    },
};
