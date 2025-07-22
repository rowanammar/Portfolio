import React, { useState, useEffect } from "react";
import SceneCanvas from "./components/scene";
import MatrixBackground from "./components/bg";
import GlassPanel from "./components/GlassPanel";
import "./components/glasspanel.css";
import ContactPanel from "./components/ContactPanel";
import AboutMeTerminal from "./components/AboutPanel";
import DevOpsPanel from "./components/DevOpsPanel";
import LaptopDesktop from "./components/LaptopDesktop";
import { Analytics } from "@vercel/analytics/react"

const PANEL_MAP = [
  "projects", // server
  "contact", // envelope (now second)
  "about", // id card (now third)
  "devops", // cloud
];

function ProjectsPanel() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LaptopDesktop />
    </div>
  );
}

function ContactMeSection() {
  return (
    <div>
      <ContactPanel />
    </div>
  );
}

export default function App() {
  const [openPanel, setOpenPanel] = useState(null);
  const [pendingPanel, setPendingPanel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [theme, setTheme] = useState("blue"); // "blue" or "green"

  // Konami-like code: up up down down right left
  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowRight",
      "ArrowLeft",
    ];
    let pos = 0;

    const handler = (e) => {
      if (e.key === sequence[pos]) {
        pos++;
        if (pos === sequence.length) {
          setTheme((prev) => (prev === "blue" ? "green" : "blue"));
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Helper for theme colors
  const themeColors = {
    blue: {
      accent: "#00faff",
      panel: "#00f2fe",
      about: "#4facfe",
      contact: "#00eaff",
      devops: "#61dafbaa",
      bg: "rgba(10,20,40,0.82)",
    },
    green: {
      accent: "#00ff99",
      panel: "#00ff99",
      about: "#39ff14",
      contact: "#00ff99",
      devops: "#39ff14aa",
      bg: "rgba(10,40,20,0.82)",
    },
  };

  const handleModelClick = (index) => {
    setPendingPanel(PANEL_MAP[index]);
    setTimeout(() => {
      setOpenPanel(PANEL_MAP[index]);
      setPendingPanel(null);
    }, 220); // 220ms delay for smoothness
  };

  const handleClosePanel = () => {
    setOpenPanel(null);
  };
  console.log("%cHey thereeeeee!!! 👾", "color: cyan; font-size: 18px; font-family: monospace;");
console.log("%cSince u found this try pressing up up bottom bottom right left keys in order!!", "color: lime; font-family: monospace;");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
      className={theme === "green" ? "hacker-green-theme" : ""}
    >
      <MatrixBackground color={theme === "green" ? "#00ff99" : "#00faff"} />
      {!openPanel && !pendingPanel && (
        <SceneCanvas
          onModelClick={handleModelClick}
          onFinishLoading={() => setModelLoaded(true)}
          accentColor={themeColors[theme].accent}
          theme={theme} // pass theme down
        />
      )}
      {openPanel === "projects" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: themeColors[theme].bg,
            backdropFilter: "blur(6px) saturate(1.2)",
          }}
        >
          <button
            onClick={handleClosePanel}
            style={{
              position: "absolute",
              top: 32,
              right: 48,
              fontSize: 36,
              color: themeColors[theme].accent,
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
              filter: `drop-shadow(0 0 8px ${themeColors[theme].accent})`,
              transition: "color 0.2s, transform 0.2s",
            }}
            aria-label="Close"
          >
            ×
          </button>
          <div style={{ width: 'min(98vw, 900px)', maxWidth: 900, height: 'min(90vh, 520px)', maxHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LaptopDesktop theme={theme} accentColor={themeColors[theme].accent} />
          </div>
        </div>
      )}
      {openPanel && openPanel !== "projects" && (
        <GlassPanel
          open={!!openPanel}
          onClose={handleClosePanel}
          color={themeColors[theme][openPanel]}
          theme={theme}
          accentColor={themeColors[theme].accent}
        >
          {openPanel === "about" && <AboutMeTerminal />}
          {openPanel === "contact" && <ContactMeSection />}
          {openPanel === "devops" && <DevOpsPanel />}
        </GlassPanel>
      )}
      <Analytics />
      {/* Optional: Add a subtle indicator */}
      <style>
        {theme === "green"
          ? `
          body, .hacker-green-theme {
            --accent: #00ff99;
            --panel: #00ff99;
            --about: #39ff14;
            --contact: #00ff99;
            --devops: #39ff14aa;
            --matrix: #00ff99;
          }
        `
          : ""}
      </style>
    </div>
  );
}
