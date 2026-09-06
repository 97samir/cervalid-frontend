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

    verifyPublicCertificate(certificatePublicId) {
        return api.getPublicVerification(certificatePublicId);
    },

    getVerificationDashboard() {
        return api.getVerificationDashboard();
    },

    searchInstitutionVerificationHistory(page, size, filters) {
        const cleanFilters = cleanHistoryFilters(filters);

        return api.searchInstitutionVerificationHistory(page, size, cleanFilters);
    },

    searchVerificationHistory(page, size, filters) {
        const cleanFilters = cleanHistoryFilters(filters);

        return api.searchVerificationHistory(
            page,
            size,
            cleanFilters,
        );
    },

    searchVerificationSummary(page, size, filters) {
        const cleanFilters = cleanHistoryFilters(filters);
        return api.searchVerificationSummary(page, size, cleanFilters);
    },

    // getCertificateVerificationHistory(certificatePublicId) {
    //     return api.getCertificateVerificationHistory(certificatePublicId);
    // },

    // searchCertificateVerificationHistory(
    //     certificatePublicId,page,size,filters,) {
    //     const cleanFilters = cleanHistoryFilters(filters);

    //     return api.searchCertificateVerificationHistory(
    //         certificatePublicId,page,size,
    //         cleanFilters,);
    // },
};
