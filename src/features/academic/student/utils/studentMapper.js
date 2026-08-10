export const studentMapper = {

    toForm: (student) => ({
        email: student?.email || "",
        institutionId: student?.institutionId || "",
        studentCode: student?.studentCode || "",
        program: student?.profile?.program || "",
        faculty: student?.profile?.faculty || "",
        modality: student?.profile?.modality || "",
        currentCycle: student?.profile?.currentCycle || "",
        admissionDate: student?.admissionDate || "",
        graduationDate: student?.graduationDate || ""
    })
};