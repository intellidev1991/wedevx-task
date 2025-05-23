import Link from "next/link";
import { Logo } from "../ui/logo";

export const DashboardHeader = () => {
  return (
    <header className="px-6 py-4 border-b border-border" aria-label="Header">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <nav className="space-x-4" aria-label="Main navigation">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Apply Now
          </Link>
        </nav>
      </div>
    </header>
  );
};
