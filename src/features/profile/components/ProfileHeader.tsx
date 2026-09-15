import React from "react";
import { LogOut, User, Package, MapPin } from "lucide-react";
import type { UserProfile } from "../hooks/useProfileHook";

export type ProfileTab = "profile" | "orders" | "address";

interface ProfileHeaderProps {
  profile: UserProfile | null;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onLogout: () => void;
}

const TABS: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={15} strokeWidth={2.5} /> },
  { id: "orders", label: "Orders", icon: <Package size={15} strokeWidth={2.5} /> },
  { id: "address", label: "Address", icon: <MapPin size={15} strokeWidth={2.5} /> },
];

export default function ProfileHeader({
  profile,
  activeTab,
  onTabChange,
  onLogout,
}: ProfileHeaderProps) {
  const initials =
    profile?.name
      ?.trim()
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U";

  return (
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg overflow-hidden border-b border-[var(--brand-gold)]/20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 pt-8 pb-6 lg:pt-12 lg:pb-8 relative z-10">
        {/* Top row: avatar + name + logout */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[var(--brand-cream-soft)] border-2 border-[var(--brand-gold)] flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl lg:text-2xl font-serif font-black text-[var(--brand-green-dark)]">
                  {initials}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.2em] mb-1">
                My Account
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-serif font-black text-white leading-tight">
                {profile?.name || "Welcome"}
              </h1>
              {profile?.email && (
                <p className="text-[11px] sm:text-[12px] text-[#F4F1EA]/80 font-medium mt-0.5">
                  {profile.email}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 shrink-0 border border-white/20 text-white hover:bg-white/10 px-3 py-2 lg:px-4 lg:py-2.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 lg:mt-8 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1.5 w-full sm:w-fit">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                  isActive
                    ? "bg-[var(--brand-gold)] text-[var(--brand-green-dark)] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
