"use client";

import AdminLayout from "@/components/layout/admin-layout";
import { Title } from "@/components/ui/mixed/title";
import { Typography } from "@/components/ui/mixed/typography";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <Title>Settings</Title>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <Typography variant="body" className="mt-4 text-muted-foreground">
            Settings page is under construction. Check back later for updates.
          </Typography>
        </div>
      </div>
    </AdminLayout>
  );
}
