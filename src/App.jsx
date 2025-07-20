import React, { useState } from "react";
import SceneCanvas from "./components/scene";
import MatrixBackground from "./components/bg";
import GlassPanel from "./components/GlassPanel";
import "./components/glasspanel.css";
import ContactPanel from "./components/ContactPanel";
import AboutMeTerminal from "./components/AboutPanel";
import { useEffect } from "react";
import DevOpsPanel from "./components/DevOpsPanel";
import LaptopDesktop from "./components/LaptopDesktop";

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

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MatrixBackground />
      {!openPanel && !pendingPanel && (
        <SceneCanvas
          onModelClick={handleModelClick}
          onFinishLoading={() => setModelLoaded(true)}
        />
      )}
      {/* Show LaptopDesktop in a fullscreen overlay when projects panel is open */}
      {openPanel === "projects" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10,20,40,0.82)",
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
              color: "#00faff",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
              filter: "drop-shadow(0 0 8px #00faff)",
              transition: "color 0.2s, transform 0.2s",
            }}
            aria-label="Close"
          >
            ×
          </button>
          <div style={{ width: 'min(98vw, 900px)', maxWidth: 900, height: 'min(90vh, 520px)', maxHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LaptopDesktop />
          </div>
        </div>
      )}
      {/* Other panels use GlassPanel as before */}
      {openPanel && openPanel !== "projects" && (
        <GlassPanel
          open={!!openPanel}
          onClose={handleClosePanel}
          color={{
            projects: "#00f2fe",
            about: "#4facfe",
            contact: "#00eaff",
            devops: "#61dafbaa",
          }[openPanel]}
        >
          {openPanel === "about" && <AboutMeTerminal />}
          {openPanel === "contact" && <ContactMeSection />}
          {openPanel === "devops" && <DevOpsPanel />}
        </GlassPanel>
      )}
    </div>
  );
}
