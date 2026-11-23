"use client";

import React from "react";
import { useCelebrationTheme } from "@/context/CelebrationThemeContext";
import ChristmasHeaderTrim from "./ChristmasHeaderTrim";
import ChristmasSnowfall from "./ChristmasSnowfall";
import OnamHeaderTrim from "./OnamHeaderTrim";
import OnamPetalsFall from "./OnamPetalsFall";
import VishuHeaderTrim from "./VishuHeaderTrim";
import CelebrationPreviewPill from "./CelebrationPreviewPill";

export default function CelebrationThemeLayer() {
  const { isCelebrationActive, activeTheme } = useCelebrationTheme();

  if (!isCelebrationActive) {
    return <CelebrationPreviewPill />;
  }

  return (
    <>
      {/* 🎄 CHRISTMAS & NEW YEAR */}
      {activeTheme === "christmas" && (
        <>
          <ChristmasHeaderTrim />
          <ChristmasSnowfall />
        </>
      )}

      {/* 🌼 ONAM FESTIVAL */}
      {activeTheme === "onam" && (
        <>
          <OnamHeaderTrim />
          <OnamPetalsFall />
        </>
      )}

      {/* 🌟 VISHU FESTIVAL */}
      {activeTheme === "vishu" && (
        <>
          <VishuHeaderTrim />
          <OnamPetalsFall />
        </>
      )}

      {/* 🌙 EID MUBARAK */}
      {activeTheme === "eid" && (
        <>
          <ChristmasHeaderTrim />
        </>
      )}

      {/* 🪔 DIWALI */}
      {activeTheme === "diwali" && (
        <>
          <ChristmasHeaderTrim />
        </>
      )}

      <CelebrationPreviewPill />
    </>
  );
}
