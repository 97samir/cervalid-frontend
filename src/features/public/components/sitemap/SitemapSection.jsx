import SitemapLink from "./SitemapLink";

export default function SitemapSection({ section }) {
    return (
        <div className="sitemap-card">
        <div className="sitemap-card-header">
            <div className="sitemap-card-icon">
            <i className={`bi ${section.icon}`}></i>
            </div>

            <div>
            <h2>{section.title}</h2>

            <p>{section.description}</p>
            </div>
        </div>

        <div className="sitemap-links">
            {section.links.map((link) => (
            <SitemapLink key={link.path} link={link} />
            ))}
        </div>
        </div>
    );
}
