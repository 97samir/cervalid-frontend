import { Link } from "react-router-dom";

export default function SitemapLink({ link }) {
    return (
        <Link to={link.path} className="sitemap-link">
        <div className="sitemap-link-icon">
            <i className={`bi ${link.icon}`}></i>
        </div>

        <span>{link.label}</span>

        <i className="bi bi-arrow-right sitemap-link-arrow"></i>
        </Link>
    );
}
