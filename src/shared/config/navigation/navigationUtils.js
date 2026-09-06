import { navigationTitles } from "./navigationTitles";

export function getNavigationInfo(pathname) {

    const routes = Object.entries(navigationTitles).sort(
        (a, b) => b[0].length - a[0].length,
    );

    const match = routes.find(([route]) => {
        
        // Ruta dinámica
        if (route.includes(":")) {

            const routePattern = route
                .split("/")
                .map((segment) => {
                    if (segment.startsWith(":")) {
                        return "[^/]+";
                    }

                    return segment;
                })
                .join("/");

            const regex = new RegExp(`^${routePattern}$`);

            return regex.test(pathname);
        }

        // Ruta normal
        return pathname === route || pathname.startsWith(`${route}/`);
    });

    if (!match) {
        return {
            title: "Cervalid",
            subtitle: "Sistema de certificación académica",
        };
    }

    return match[1];
}
