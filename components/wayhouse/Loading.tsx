"use client";

import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [color, setColor] = useState("#00FFAA"); // fallback color

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cssVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--color1");

      if (cssVar) {
        setColor(cssVar.trim());
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <ScaleLoader
        color={color}
        height={40}
        width={5}
        radius={4}
        margin={4}
      />
    </div>
  );
}
