"use client";

import React from "react";
import { useCelebrationTheme } from "@/context/CelebrationThemeContext";
import ChristmasHeaderTrim from "./ChristmasHeaderTrim";
import ChristmasSnowfall from "./ChristmasSnowfall";
import CelebrationPreviewPill from "./CelebrationPreviewPill";

export default function CelebrationThemeLayer() {
  const { isCelebrationActive, activeTheme } = useCelebrationTheme();

  return (
    <>
      {isCelebrationActive && activeTheme === "christmas" && (
        <>
          <ChristmasHeaderTrim />
          <ChristmasSnowfall />
        </>
      )}
      <CelebrationPreviewPill />
    </>
  );
}
