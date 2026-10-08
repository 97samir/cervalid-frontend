const normalizeStatus = (status, valid) => {
    if (status !== null && status !== undefined && status !== "") {
        const normalizedStatus = String(status).toUpperCase();

        switch (normalizedStatus) {
        case "ISSUED":
        case "VALID":
            return "VALID";

        case "REVOKED":
            return "REVOKED";

        case "INVALID":
            return "INVALID";

        case "NOT_FOUND":
            return "NOT_FOUND";

        default:
            break;
        }
    }

    if (typeof valid === "boolean") {
        return valid ? "VALID" : "INVALID";
    }

    return "NOT_FOUND";
};

const getValueOrNull = (value) => {
    return value === undefined || value === null || value === "" ? null : value;
};

export const normalizeCredentialVerification = (result) => {
    const credential = result?.credential ?? result ?? {};

    const recipient = credential.recipient ?? {};
    const issuer = credential.issuer ?? {};
    const academic = credential.academic ?? {};
    const integrity = credential.integrity ?? {};
    const revocation = credential.revocation ?? {};

    const recipientName =
    recipient.fullName ||
    [recipient.name, recipient.lastName]
        .filter(Boolean)
        .join(" ")
        .trim() ||
    null;

    return {
        verificationType: "CREDENTIAL",

        resourcePublicId:
            credential.credentialPublicId ?? credential.publicId ?? null,

        resourceNumber: credential.credentialNumber ?? null,

        resourceNumberLabel: "Número de credencial",

        resourceType: credential.type ?? null,

        status: normalizeStatus(
        result?.verificationStatus ?? result?.status ?? credential.status,
        result?.valid ?? credential.valid,
        ),

        verificationLevel: result?.verificationLevel ?? "LOCAL",

        title: credential.title ?? null,

        description: credential.description ?? null,

        awardedAt: credential.awardedAt ?? null,

        issuedAt: credential.issuedAt ?? null,

        //studentName: recipient.name ?? recipient.fullName ?? null,
        studentName: recipientName,

        studentCode: recipient.studentCode ?? null,

        institutionName: issuer.institutionName ?? null,

        academic: {
        program: getValueOrNull(academic.program),

        faculty: getValueOrNull(academic.faculty),

        modality: getValueOrNull(academic.modality),

        currentCycle: getValueOrNull(academic.currentCycle),
        },

        document: {
        documentHash: getValueOrNull(credential.document?.documentHash),

        documentUrl: getValueOrNull(credential.document?.documentUrl),
        },

        integrity: {
        verificationHash: getValueOrNull(integrity.verificationHash),

        certificateHash: getValueOrNull(integrity.certificateHash),

        credentialHash: getValueOrNull(integrity.credentialHash),

        blockchainTxHash: getValueOrNull(integrity.blockchainTxHash),

        blockchainNetwork: getValueOrNull(integrity.blockchainNetwork),

        blockNumber: getValueOrNull(integrity.blockNumber),

        anchoredAt: getValueOrNull(integrity.anchoredAt),
        },

        revocation: {
        revokedAt: getValueOrNull(revocation.revokedAt),

        reason: getValueOrNull(revocation.reason),
        },

        verificationUrl: credential.verificationUrl ?? null,
    };
};

export const normalizeCertificateVerification = (result) => {
    return {
        verificationType: "CERTIFICATE",

        resourcePublicId: result?.certificatePublicId ?? null,

        resourceNumber: result?.certificateNumber ?? null,

        resourceNumberLabel: "Número de certificado",

        resourceType: result?.certificateType ?? null,

        status: normalizeStatus(
        result?.verificationStatus ?? result?.status,
        result?.valid,
        ),

        verificationLevel: result?.verificationLevel ?? "LOCAL",

        title: result?.title ?? null,

        description: result?.description ?? null,

        awardedAt: result?.awardedAt ?? null,

        issuedAt: result?.issuedAt ?? null,

        studentName: result?.studentName ?? null,

        studentCode: result?.studentCode ?? null,

        institutionName: result?.institutionName ?? null,

        academic: {
        program: getValueOrNull(result?.program),

        faculty: getValueOrNull(result?.faculty),

        modality: getValueOrNull(result?.modality),

        currentCycle: getValueOrNull(result?.currentCycle),
        },

        document: {
        documentHash: getValueOrNull(result?.documentHash),

        documentUrl: getValueOrNull(result?.documentUrl),
        },

        integrity: {
        verificationHash: getValueOrNull(result?.verificationHash),

        certificateHash: getValueOrNull(result?.certificateHash),

        credentialHash: getValueOrNull(result?.credentialHash),

        blockchainTxHash: getValueOrNull(result?.blockchainTxHash),

        blockchainNetwork: getValueOrNull(result?.network),

        blockNumber: getValueOrNull(result?.blockNumber),

        anchoredAt: getValueOrNull(result?.anchoredAt),
        },

        revocation: {
        revokedAt: getValueOrNull(result?.revokedAt),

        reason: getValueOrNull(result?.revocationReason),
        },

        verificationUrl: result?.verificationUrl ?? null,
    };
};

export const normalizeVerificationResult = (result) => {
    if (!result) {
        return null;
    }

    const isCredential =
        result?.verificationType === "CREDENTIAL" ||
        Boolean(result?.credentialPublicId || result?.credential);

    return isCredential
        ? normalizeCredentialVerification(result)
        : normalizeCertificateVerification(result);
};
