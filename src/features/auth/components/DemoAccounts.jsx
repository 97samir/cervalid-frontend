const demoAccounts = [
    {
        role: "Estudiante",
        email: "estudiante@demo.com",
        icon: "bi-mortarboard-fill",
    },
    {
        role: "Institución",
        email: "institucion@demo.com",
        icon: "bi-building-fill",
    },
    {
        role: "Empresa",
        email: "empresa@demo.com",
        icon: "bi-briefcase-fill",
    },
    {
        role: "Superadmin",
        email: "admin@demo.com",
        icon: "bi-shield-lock-fill",
    },
];

export default function DemoAccounts({ onSelect }) {
    return (
        <section className="demo-accounts" aria-labelledby="demo-accounts-title">
            <div className="demo-accounts-header">
                <div className="demo-accounts-icon" aria-hidden="true">
                    <i className="bi bi-stars"></i>
                </div>

                <div>
                    <h2
                        id="demo-accounts-title"
                        className="demo-accounts-title"
                    >
                        Cuentas demo
                    </h2>

                    <p className="demo-accounts-description">
                        Selecciona un rol para completar los datos de acceso.
                    </p>
                </div>
            </div>

            <div className="demo-accounts-list">
                {demoAccounts.map((account) => (
                    <button
                        key={account.email}
                        type="button"
                        className="demo-account-item"
                        onClick={() => onSelect(account)}
                        aria-label={`Usar cuenta demo de ${account.role}`}
                    >
                        <span
                            className="demo-account-item-icon"
                            aria-hidden="true"
                        >
                            <i className={`bi ${account.icon}`}></i>
                        </span>

                        <span className="demo-account-item-content">
                            <span className="demo-account-item-role">
                                {account.role} Demo
                            </span>

                            <span className="demo-account-item-email">
                                {account.email}
                            </span>
                        </span>

                        <i
                            className="bi bi-arrow-right demo-account-item-arrow"
                            aria-hidden="true"
                        ></i>
                    </button>
                ))}
            </div>

            <div className="demo-accounts-password">
                <i className="bi bi-key-fill" aria-hidden="true"></i>

                <span>
                    Contraseña para todas: <strong>demo123</strong>
                </span>
            </div>
        </section>
    );
}