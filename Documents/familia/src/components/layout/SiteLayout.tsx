import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFab } from "@/components/support/WhatsAppFab";
import { PwaInstallPrompt } from "@/components/support/PwaInstallPrompt";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <WhatsAppFab />
      <PwaInstallPrompt />
    </div>
  );
}
