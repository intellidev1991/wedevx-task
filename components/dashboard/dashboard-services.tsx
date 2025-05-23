import { Typography } from "../ui/mixed/typography";

const services = [
  {
    title: "O-1 Visa",
    description:
      "For individuals with extraordinary ability in sciences, arts, education, business, or athletics.",
    aria: "O-1 Visa service",
  },
  {
    title: "EB-1A Visa",
    description:
      "Employment-based first preference for persons of extraordinary ability.",
    aria: "EB-1A Visa service",
  },
  {
    title: "EB-2 NIW",
    description:
      "National Interest Waiver for professionals with advanced degrees or exceptional ability.",
    aria: "EB-2 NIW service",
  },
];

export const DashboardServices = () => {
  return (
    <section
      className="py-16 px-4 service-bg"
      aria-label="Our Immigration Services"
    >
      <div className="container mx-auto max-w-4xl">
        <Typography
          variant="body"
          className="text-3xl font-bold mb-12 text-center"
        >
          Our Immigration Services
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-lg shadow-sm"
              aria-label={service.aria}
            >
              <Typography variant="title">{service.title}</Typography>
              <Typography variant="body">{service.description}</Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
