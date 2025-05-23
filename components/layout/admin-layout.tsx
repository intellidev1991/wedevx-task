"use client";

import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/ui/logo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <>
      {/* Gradient top-left background */}
      <div
        className="absolute top-0 left-0 w-full h-64 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, #f8f7e2 20%, transparent 100%)",
        }}
      />
      <div className="p-6 relative z-10">
        <Logo />
      </div>
      <nav
        className="flex-1 px-4 space-y-2 relative z-10"
        aria-label="Sidebar navigation"
      >
        <Link
          href="/admin"
          className="block py-2 px-4 text-foreground font-medium hover:bg-accent rounded-md"
          onClick={() => setDrawerOpen(false)}
        >
          Leads
        </Link>
        <Link
          href="/admin/settings"
          className="block py-2 px-4 text-foreground font-medium hover:bg-accent rounded-md"
          onClick={() => setDrawerOpen(false)}
        >
          Settings
        </Link>
      </nav>
      <div className="p-4 border-t border-border relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
          <button
            onClick={signOut}
            className="p-2 text-muted-foreground hover:text-foreground rounded-md"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div
        className="w-64 border-r border-border flex-col relative hidden md:flex"
        aria-label="Sidebar"
      >
        {SidebarContent}
      </div>
      {/* Mobile Drawer Trigger */}
      <div className="md:hidden absolute top-4 left-4 z-20">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <button
              className="p-2 rounded-md bg-white/80 shadow border border-gray-200"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </DrawerTrigger>
          <DrawerContent className="p-0" aria-label="Sidebar drawer">
            <DrawerHeader className="p-0" />
            <div className="w-64 min-h-screen bg-[#fafae5] border-r border-border flex flex-col relative">
              {SidebarContent}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
