export function validateStudent(form, mode) {

    const errors = {};

    // Email

    if (form.email !== undefined) {
        if (!form.email.trim()) {
        errors.email = "Correo obligatorio";
        }

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (form.email && !emailRegex.test(form.email)) {
        errors.email = "Correo inválido";
        }
    }

    // Código

    if (!form.studentCode?.trim()) {
        errors.studentCode = "Código obligatorio";
    } else if (form.studentCode.length < 4) {
        errors.studentCode = "Mínimo 4 caracteres";
    }

    if (mode == "register") { 
        // Programa

        if (!form.program?.trim()) {
            errors.program = "Programa obligatorio";
        }

        // Facultad

        if (!form.faculty?.trim()) {
            errors.faculty = "Facultad obligatoria";
        }

        // Modalidad

        if (!form.modality?.trim()) {
            errors.modality = "Modalidad obligatoria";
        }

        // Ciclo

        const cycle = Number(form.currentCycle);

        if (!cycle || cycle < 1 || cycle > 10) {
            errors.currentCycle = "Ciclo inválido";
        }
    }

    // Fecha ingreso

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const admission = new Date(form.admissionDate);

    if (!form.admissionDate) {
        errors.admissionDate = "Fecha obligatoria";
    } else if (admission > today) {
        errors.admissionDate = "No puede ser mayor a hoy";
    }

    // Fecha graduación

    const graduation = new Date(form.graduationDate);

    if (!form.graduationDate) {
        errors.graduationDate = "Fecha obligatoria";
    } else {
        const minimumGraduation = new Date(admission);

        minimumGraduation.setFullYear(minimumGraduation.getFullYear() + 2);

        if (graduation < minimumGraduation) {
        errors.graduationDate = "Debe ser al menos 2 años después";
        }
    }

    return errors;
}
