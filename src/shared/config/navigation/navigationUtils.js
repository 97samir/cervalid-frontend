import { navigationTitles } from "./navigationTitles";

export function getNavigationInfo(pathname) {

    const routes = Object.entries(navigationTitles).sort(
        (a, b) => b[0].length - a[0].length,
    );

    const match = routes.find(([route]) => pathname.startsWith(route));

    if (!match) {
        return {
            title: "Cervalid",
            subtitle: "Sistema de certificación académica",
        };
    }

    return match[1];
}
