// hook personalizado para acceder fácilmente al contexto
// Sin este hook deberías escribir: useContext(AuthContext) en todos lados
// con este hook solo se escribe: useAuthStore()

import { useContext } from "react";
import AuthContext from "./AuthContext";

export default function useAuthStore() {
  return useContext(AuthContext);
}
