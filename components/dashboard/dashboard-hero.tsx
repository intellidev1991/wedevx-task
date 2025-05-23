import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Typography } from "../ui/mixed/typography";

export const DashboardHero = () => {
  return (
    <section className="py-16 px-4 md:py-24" aria-label="Hero section">
      <div className="container mx-auto max-w-4xl text-center">
        <Typography
          variant="title"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Get An Assessment Of Your Immigration Case
        </Typography>
        <Typography
          variant="body"
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Our team of experienced attorneys will review your information and
          provide a preliminary assessment of your case.
        </Typography>
        <Link
          href="/submit"
          aria-label="Apply for Assessment"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Apply for Assessment <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};
