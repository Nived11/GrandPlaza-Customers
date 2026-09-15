"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader, { type ProfileTab } from "./components/ProfileHeader";
import ProfileDetailsSection from "./components/ProfileDetailsSection";
import OrdersSection from "./components/OrdersSection";
import AddressSection from "./components/AddressSection";
import ProfileSkeleton from "./components/ProfileSkeleton";
import { useProfileHook } from "./hooks/useProfileHook";

const ProfileMain = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  const {
    profile,
    orders,
    loading,
    ordersLoading,
    saving,
    fetchOrders,
    updateProfile,
    logout,
  } = useProfileHook();

  // Lazily fetch orders the first time that tab is opened.
  // Addresses are handled entirely by AddressSection's own useAddressHook.
  useEffect(() => {
    if (activeTab === "orders" && orders.length === 0) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--brand-cream-soft)]">
      <ProfileHeader
        profile={profile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={logout}
      />

      <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-8 py-8 lg:py-12">
        {activeTab === "profile" && (
          <ProfileDetailsSection
            profile={profile}
            saving={saving}
            onSave={updateProfile}
          />
        )}

        {activeTab === "orders" && (
          <OrdersSection orders={orders} loading={ordersLoading} />
        )}

        {activeTab === "address" && <AddressSection />}
      </div>
    </div>
  );
};

export default ProfileMain;
