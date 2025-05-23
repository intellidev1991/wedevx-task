import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardServices } from "@/components/dashboard/dashboard-services";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1">
        <DashboardHero />

        <DashboardServices />
      </main>
      <DashboardFooter />
    </div>
  );
}
