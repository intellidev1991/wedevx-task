import { Logo } from "../ui/logo";
import { Typography } from "../ui/mixed/typography";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "O-1 Visa", href: "#" },
      { label: "EB-1A Visa", href: "#" },
      { label: "EB-2 NIW", href: "#" },
      { label: "Consultation", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export const DashboardFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4" aria-label="Footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="text-white" />
            <Typography variant="body" className="mt-4 text-gray-400">
              Helping exceptional individuals navigate their immigration
              journey.
            </Typography>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <Typography variant="body" className="text-lg font-medium mb-4">
                {section.title}
              </Typography>
              <ul className="space-y-2" aria-label={section.title + " links"}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hamed Taheri.</p>
        </div>
      </div>
    </footer>
  );
};
