// Debido a que las cookies HttpOnly no pueden ser leídas por
// JavaScript (por seguridad), el frontend valida la sesión
// consultando el endpoint /auth/me

const SESSION_KEY = "cervalid_session";
const INSTITUTION_CONTEXT_KEY = "institution_context";
const PENDING_INSTITUTIONS_KEY = "cervalid_pending_institutions";

const tokenManager = {
    hasSession() {
        return sessionStorage.getItem(SESSION_KEY) === "true";
    },

    setSession() {
        sessionStorage.setItem(SESSION_KEY, "true");
    },

    clearSession() {
        sessionStorage.removeItem(SESSION_KEY);
    },

    setInstitutionContext(institution) {
        sessionStorage.setItem(
            INSTITUTION_CONTEXT_KEY,
            JSON.stringify(institution),
        );
    },

    getInstitutionContext() {
        const data = sessionStorage.getItem(INSTITUTION_CONTEXT_KEY);

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch {
            sessionStorage.removeItem(INSTITUTION_CONTEXT_KEY);
            return null;
        }
    },

    clearInstitutionContext() {
        sessionStorage.removeItem(INSTITUTION_CONTEXT_KEY);
    },

    setPendingInstitutions(institutions) {
        sessionStorage.setItem(
            PENDING_INSTITUTIONS_KEY,
            JSON.stringify(institutions),
        );
    },

    getPendingInstitutions() {
        const data = sessionStorage.getItem(PENDING_INSTITUTIONS_KEY);

        if (!data) {
            return [];
        }

        try {
            const institutions = JSON.parse(data);
            return Array.isArray(institutions) ? institutions : [];
        } catch {
            sessionStorage.removeItem(PENDING_INSTITUTIONS_KEY);
            return [];
        }
    },

    clearPendingInstitutions() {
        sessionStorage.removeItem(PENDING_INSTITUTIONS_KEY);
    },
};

export default tokenManager;
