"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [isCelebrationActive, setIsCelebrationActive] = useState<boolean>(false);
  const [activeTheme, setActiveThemeState] = useState<FestivalTheme>("christmas");

  useEffect(() => {
    if (!storeStatus.loading) {
      setIsCelebrationActive(Boolean(storeStatus.celebrationMode));
      if (storeStatus.celebrationTheme) {
        setActiveThemeState(storeStatus.celebrationTheme as FestivalTheme);
      }
    }
  }, [storeStatus.loading, storeStatus.celebrationMode, storeStatus.celebrationTheme]);

  const toggleCelebration = () => {
    setIsCelebrationActive((prev) => !prev);
  };

  const setActiveTheme = (theme: FestivalTheme) => {
    setActiveThemeState(theme);
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
