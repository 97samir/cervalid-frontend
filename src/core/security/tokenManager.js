// Debido a que las cookies HttpOnly no pueden ser leídas por
// JavaScript (por seguridad), el frontend valida la sesión
// consultando el endpoint /auth/me

const tokenManager = {

  //Verifica si existe una sesión activa
  hasSession() {
    return !! sessionStorage.getItem("cervalid_session");
  },

  //Marca la sesión como activa
  setSession() {
    sessionStorage.setItem("cervalid_session", "true");
  },

  // Limpia la sesión del cliente
  clearSession() {
    sessionStorage.clear();
  },

  setInstitutionContext(institution) {
    sessionStorage.setItem("institution_context", JSON.stringify(institution));
  },

  getInstitutionContext() {
    const data = sessionStorage.getItem("institution_context");
    return data ? JSON.parse(data) : null;
  },

  clearInstitutionContext() {
    sessionStorage.removeItem("institution_context");
  }

};

export default tokenManager;