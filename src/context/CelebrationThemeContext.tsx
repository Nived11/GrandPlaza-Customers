"use client";

import React, { createContext, useContext, useState } from "react";
import { useStoreStatus } from "@/hooks/useStoreStatus";

export type FestivalTheme = "christmas" | "onam" | "vishu" | "eid" | "diwali" | "none";

interface CelebrationThemeContextType {
  isCelebrationActive: boolean;
  activeTheme: FestivalTheme;
  toggleCelebration: () => void;
  setActiveTheme: (theme: FestivalTheme) => void;
}

const CelebrationThemeContext = createContext<CelebrationThemeContextType>({
  isCelebrationActive: false,
  activeTheme: "christmas",
  toggleCelebration: () => {},
  setActiveTheme: () => {},
});

export function CelebrationThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeStatus = useStoreStatus();
  const [overrideActive, setOverrideActive] = useState<boolean | null>(null);
  const [overrideTheme, setOverrideTheme] = useState<FestivalTheme | null>(null);

  const isCelebrationActive =
    overrideActive !== null
      ? overrideActive
      : Boolean(storeStatus.celebrationMode);

  const activeTheme =
    overrideTheme !== null
      ? overrideTheme
      : ((storeStatus.celebrationTheme as FestivalTheme) || "christmas");

  const toggleCelebration = () => {
    setOverrideActive((prev) => (prev !== null ? !prev : !isCelebrationActive));
  };

  const setActiveTheme = (theme: FestivalTheme) => {
    setOverrideTheme(theme);
  };

  return (
    <CelebrationThemeContext.Provider
      value={{
        isCelebrationActive,
        activeTheme,
        toggleCelebration,
        setActiveTheme,
      }}
    >
      {children}
    </CelebrationThemeContext.Provider>
  );
}

export const useCelebrationTheme = () => useContext(CelebrationThemeContext);
