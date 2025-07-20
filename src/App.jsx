import React, { useState } from "react";
import SceneCanvas from "./components/scene";
import MatrixBackground from "./components/bg";
import GlassPanel from "./components/GlassPanel";
import "./components/glasspanel.css";
import ContactPanel from "./components/ContactPanel";
import AboutMeTerminal from "./components/AboutPanel";
import { useEffect } from "react";
import DevOpsPanel from "./components/DevOpsPanel";

const PANEL_MAP = [
  "projects", // server
  "contact", // envelope (now second)
  "about", // id card (now third)
  "devops", // cloud
];

function ProjectsPanel() {
  return (
    <>
      <h2>Projects</h2>
      <ul>projects ana 3mlaha</ul>
    </>
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
      <GlassPanel
        open={!!openPanel}
        onClose={handleClosePanel}
        color={
          {
            projects: "#00f2fe",
            about: "#4facfe",
            contact: "#00eaff",
            devops: "#61dafbaa",
          }[openPanel]
        }
      >
        {openPanel === "projects" && <ProjectsPanel />}
        {openPanel === "about" && <AboutMeTerminal />}
        {openPanel === "contact" && <ContactMeSection />}
        {openPanel === "devops" && <DevOpsPanel />}
      </GlassPanel>
    </div>
  );
}
