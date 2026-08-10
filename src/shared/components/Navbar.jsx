// Barra superior del sistema
// Muestra información básica del usuario autenticado
import "./Navbar.css";
import useAuthStore from "@/app/store/auth/useAuthStore";
import { useLocation } from "react-router-dom";
import { getNavigationInfo }from "../config/navigation/navigationUtils";
import { getRoleLabel } from "../utils/roleUtils";

export default function Navbar() {

  const location = useLocation();
  const page = getNavigationInfo(location.pathname);
  const { user } = useAuthStore();

  const initials = `${user?.name?.[0] ?? ""}
                    ${user?.lastName?.[0] ?? ""}`;

  return (
    <header className="navbar-custom">
      <div className="navbar-title">
        <h5>{page.title}</h5>
        <small>{page.subtitle}</small>
      </div>

      <div className="navbar-user">
        <div className="navbar-user-info">
          <strong>{user?.name} {user?.lastName}</strong>
          <span>{getRoleLabel(user?.role)}</span>
        </div>

        <div className="navbar-avatar">{initials}</div>
      </div>
    </header>
  );
}
