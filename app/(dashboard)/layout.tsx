"use client";

import SideNavBar from "@/components/nav/SideBarNav";
import Logo from "@/components/nav/Logo";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUserAccount = useStore(
    (state) => state.fetchUserAccount
  );

  useEffect(() => {
    fetchUserAccount();
  }, [fetchUserAccount]);

  return (
    <div>
      <div className="md:pt-10 pr-6 md:pl-5 flex items-center justify-end md:justify-start pt-5 bg-black">
        <Logo />
      </div>

      <div className="flex gap-5 bg-black">
        <aside>
          <SideNavBar />
        </aside>
        
        <div className="pt-10 md:pl-15">
          {children}
        </div>
      </div>
    </div>
  );
}
