"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import ProfileHeader, {
  type ProfileTab,
} from "./components/ProfileHeader";

import ProfileDetailsSection from "./components/ProfileDetailsSection";
import OrdersSection from "./components/OrdersSection";
import AddressSection from "./components/AddressSection";
import ProfileSkeleton from "./components/ProfileSkeleton";

import {
  useProfileHook,
} from "./hooks/useProfileHook";

const ProfileMain = () => {
  const searchParams =
    useSearchParams();

  /*
   * Read requested profile tab
   *
   * /profile
   * /profile?tab=orders
   * /profile?tab=address
   */
  const requestedTab =
    searchParams.get("tab");

  const getInitialTab =
    (): ProfileTab => {
      if (
        requestedTab === "orders" ||
        requestedTab === "address" ||
        requestedTab === "profile"
      ) {
        return requestedTab;
      }

      return "profile";
    };

  const [
    activeTab,
    setActiveTab,
  ] = useState<ProfileTab>(
    getInitialTab
  );

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

  /*
   * Sync tab with URL
   */
  useEffect(() => {
    const tab =
      searchParams.get("tab");

    if (
      tab === "orders" ||
      tab === "address" ||
      tab === "profile"
    ) {
      setActiveTab(tab);
    } else {
      setActiveTab("profile");
    }
  }, [searchParams]);

  /*
   * Fetch orders when Orders tab
   * is opened.
   */
  useEffect(() => {
    if (
      activeTab === "orders" &&
      orders.length === 0
    ) {
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

        {/* PROFILE */}
        {activeTab === "profile" && (
          <ProfileDetailsSection
            profile={profile}
            saving={saving}
            onSave={updateProfile}
          />
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <OrdersSection
            orders={orders}
            loading={ordersLoading}
          />
        )}

        {/* ADDRESS */}
        {activeTab === "address" && (
          <AddressSection />
        )}

      </div>
    </div>
  );
};

export default ProfileMain;