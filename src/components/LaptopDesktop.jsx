import React, { useEffect, useState } from "react";

const desktopWallpaper = "/windows.jpeg";
const projectsDataPath = "/projects.json";

// Simple SVG folder icon
const FolderIcon = ({ className }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="4"
      y="14"
      width="40"
      height="26"
      rx="4"
      fill="#101828"
      stroke="#00faff"
      strokeWidth="2"
    />
    <path
      d="M4 18V14a4 4 0 0 1 4-4h10l4 6h22a4 4 0 0 1 4 4v4"
      fill="#1a2233"
      stroke="#00faff"
      strokeWidth="2"
    />
  </svg>
);

function TechBadge({ tech }) {
  return (
    <span className="px-2 py-1 rounded bg-[#101828] border border-[#00faff] text-[#00faff] text-xs font-mono mr-2 mb-1 shadow-md">
      {tech}
    </span>
  );
}

// Helper to render description as paragraphs and bullet points
function renderDescription(desc) {
  if (!desc) return null;
  // Split into lines
  const lines = desc.split(/\n+/);
  return lines.map((line, idx) => {
    if (line.trim().startsWith('- ')) {
      // Bullet point
      return (
        <li key={idx} style={{ marginBottom: 4, marginLeft: 16, color: '#285ca8', fontSize: '1rem', textAlign: 'left' }}>{line.replace(/^- /, '')}</li>
      );
    } else if (line.trim() !== '') {
      // Paragraph
      return (
        <p key={idx} style={{ color: '#111', margin: '8px 0', fontSize: '1.05rem', textAlign: 'left' }}>{line}</p>
      );
    } else {
      return null;
    }
  });
}

export default function LaptopDesktop() {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(projectsDataPath)
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    if (openProject) {
      setFadeIn(false);
      setTimeout(() => setFadeIn(true), 10);
    }
  }, [openProject]);

  // Responsive sizing
  const screenW = Math.min(window.innerWidth * 0.99, 1100);
  const screenH = Math.min(window.innerHeight * 0.93, 600);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: 320 }}
    >
      {/* Laptop Frame - larger, sharper, gaming style, with shadow */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: screenW,
          height: screenH + 44,
          background: "#18181b",
          borderRadius: 18, // Sharper corners
          boxShadow: "0 12px 64px 12px #000a, 0 0 0 8px #222",
          border: "10px solid #18181b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Laptop Screen - sharper, inset, with wallpaper */}
        <div
          className="relative overflow-hidden"
          style={{
            width: screenW - 44,
            height: screenH - 16,
            background: `url(${desktopWallpaper}) center/cover no-repeat`,
            borderRadius: 7,
            border: "4px solid #222",
            boxShadow: "0 0 40px #00faff33",
            // Remove display: flex and related properties
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Desktop Icons */}
          <div className="absolute inset-0 p-10 flex flex-wrap items-start gap-12">
            {projects.map((project, idx) => (
              <div
                key={project.name}
                className="flex flex-col items-center cursor-pointer group select-none"
                style={{ width: 110, margin: '0 18px 32px 18px' }}
                onClick={() => setOpenProject(project)}
              >
                {project.icon ? (
                  <img
                    src={project.icon}
                    alt={project.name + ' icon'}
                    style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 8, filter: 'drop-shadow(0 0 8px #00faff88)' }}
                  />
                ) : (
                  <FolderIcon className="mb-2 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_#00faff] transition-transform" />
                )}
                <span
                  className="font-mono text-center group-hover:text-[#00faff] group-hover:drop-shadow-[0_0_10px_#00faff] transition-colors"
                  style={{
                    display: 'block',
                    width: '100%',
                    color: '#000',
                    fontSize: '0.98rem',
                    marginTop: 2,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                    lineHeight: 1.2,
                    minHeight: 32,
                  }}
                >
                  {project.title}
                </span>
              </div>
            ))}
          </div>

          {/* Floating Project Window - Windows maximized style, always inside the laptop screen */}
          {openProject && (
            <div
              className={`absolute animate-fade-in ${
                fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } transition-all duration-300`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 7,
                background: "#f3f6fa",
                border: "1.5px solid #3a6ea5",
                boxShadow: "0 8px 32px #0005",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Top Bar - Windows maximized style */}
              <div
                className="relative flex items-center"
                style={{
                  height: 38,
                  background:
                    "linear-gradient(90deg, #4f8edc 0%, #285ca8 100%)",
                  borderTopLeftRadius: 7,
                  borderTopRightRadius: 7,
                  borderBottom: "1.5px solid #3a6ea5",
                  boxShadow: "0 2px 8px #0002",
                  paddingLeft: 16,
                }}
              >
                <span
                  className="text-white text-base font-semibold tracking-wide"
                  style={{ textShadow: "0 1px 2px #285ca8" }}
                >
                  {openProject.name}
                </span>

                <button
                  onClick={() => setOpenProject(null)}
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                    width: 28,
                    height: 28,
                    background:
                      "linear-gradient(145deg, #e35d5b 60%, #b22222 100%)",
                    border: "1.5px solid #a11",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(145deg, #ff7b7b 60%, #b22222 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(145deg, #e35d5b 60%, #b22222 100%)";
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <line
                      x1="4"
                      y1="4"
                      x2="12"
                      y2="12"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="12"
                      y1="4"
                      x2="4"
                      y2="12"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div
                className="flex flex-col items-center px-6 py-4"
                style={{
                  background: "#f3f6fa",
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                  height: "calc(100% - 38px)",
                  overflowY: "auto",
                  width: "100%",
                }}
              >
                {/* Title */}
                <h2 style={{ color: '#285ca8', fontWeight: 800, fontSize: '1.45rem', margin: '0 0 2px 0', letterSpacing: '0.01em', textAlign: 'center' }}>{openProject.title}</h2>
                {/* Subtitle */}
                {openProject.subtitle && (
                  <div style={{ color: '#4f8edc', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: 8, textAlign: 'center' }}>{openProject.subtitle}</div>
                )}
                <hr style={{ border: 'none', borderTop: '1.5px solid #bcd2ee', margin: '8px 0 12px 0', width: '100%' }} />
                {/* Description */}
                <p style={{ color: '#111', margin: '0 0 12px 0', fontSize: '1.08rem', textAlign: 'left', fontWeight: 500 }}>{openProject.description}</p>
                {/* What to Expect */}
                {openProject.whatToExpect && openProject.whatToExpect.length > 0 && (
                  <div style={{ width: '100%', margin: '0 0 18px 0' }}>
                    <div style={{ color: '#285ca8', fontWeight: 700, fontSize: '1.08rem', marginBottom: 4 }}>What to Expect</div>
                    <ul style={{ paddingLeft: 22, margin: 0, color: '#285ca8', fontSize: '1rem' }}>
                      {openProject.whatToExpect.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: 4, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* View Code / Live Demo button (moved above GIF) */}
                <a
                  href={openProject.link === '#' ? undefined : openProject.link}
                  target={openProject.link === '#' ? undefined : "_blank"}
                  rel={openProject.link === '#' ? undefined : "noopener noreferrer"}
                  className="mt-1 px-4 py-2 rounded bg-[#4f8edc] text-white font-sans font-bold text-sm shadow hover:bg-[#285ca8] transition-colors"
                  style={{ boxShadow: "0 1px 4px #3a6ea533", cursor: openProject.link === '#' ? 'pointer' : undefined, marginBottom: 18 }}
                  onClick={e => {
                    if (openProject.link === '#') {
                      e.preventDefault();
                      setShowPopup(true);
                    }
                  }}
                >
                  Live Demo
                </a>
                {/* Demo GIF/image */}
                {openProject.demo && (
                  <div style={{ width: '100%', maxWidth: 520, margin: '0 auto 12px auto', textAlign: 'center' }}>
                    <h3 style={{ color: '#285ca8', fontWeight: 700, fontSize: '1.18rem', marginBottom: 8, letterSpacing: '0.01em' }}>Demo</h3>
                    <img
                      src={openProject.demo}
                      alt={openProject.title + ' demo'}
                      style={{ width: '100%', maxWidth: 420, borderRadius: 8, boxShadow: '0 2px 12px #285ca822', border: '1.5px solid #bcd2ee', background: '#fff' }}
                    />
                  </div>
                )}
                <div className="flex flex-wrap justify-center mb-3">
                  {openProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded bg-[#eaf1fb] border border-[#3a6ea5] text-[#285ca8] text-xs font-mono mr-2 mb-1 shadow"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Laptop Bezel/Bottom - thicker, sharper, gaming style */}
        <div
          className="absolute left-1/2"
          style={{
            bottom: 0,
            width: screenW * 0.36,
            height: 22,
            background: "#222",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 4px 24px #000a",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      {/* Popup Modal for 'You are already here' */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#ece9d8',
              border: '2.5px solid #395fa8',
              borderRadius: 6,
              boxShadow: '4px 8px 32px #0007',
              minWidth: 340,
              minHeight: 120,
              fontFamily: 'Tahoma, Verdana, Segoe, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Title Bar */}
            <div
              style={{
                background: 'linear-gradient(90deg, #1856b6 0%, #3a7bd5 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.08rem',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1.5px solid #395fa8',
                userSelect: 'none',
                position: 'relative',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" style={{marginRight: 8}}><circle cx="10" cy="10" r="10" fill="#fff"/><text x="10" y="15" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1856b6">i</text></svg>
        
              <button
                onClick={() => setShowPopup(false)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  right: 6,
                  top: 3,
                  width: 22,
                  height: 22,
                  background: '#ece9d8',
                  border: '1.5px solid #888',
                  borderRadius: 2,
                  color: '#222',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0 #fff',
                  padding: 0,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#d6d3c4'}
                onMouseOut={e => e.currentTarget.style.background = '#ece9d8'}
              >
                ×
              </button>
            </div>
            {/* Content */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '24px 24px 12px 24px' }}>
              <svg width="38" height="38" viewBox="0 0 32 32" style={{marginRight: 18}}><circle cx="16" cy="16" r="16" fill="#3a7bd5"/><text x="16" y="25" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#fff">i</text></svg>
              <span style={{ color: '#222', fontSize: '1.13rem', fontWeight: 500, textAlign: 'left' }}>
                You are already here!
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 18px 18px 0' }}>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  minWidth: 80,
                  padding: '4px 0',
                  background: 'linear-gradient(180deg, #f8f8f8 0%, #d6d3c4 100%)',
                  border: '2px outset #fff',
                  borderRadius: 2,
                  color: '#222',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: 'inset 1px 1px 0 #fff',
                  marginLeft: 8,
                  cursor: 'pointer',
                  fontFamily: 'Tahoma, Verdana, Segoe, sans-serif',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#e4e3de'}
                onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(180deg, #f8f8f8 0%, #d6d3c4 100%)'}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Tailwind animation (add to global CSS if not present):
// @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
// .animate-fade-in { animation: fade-in 0.3s ease; }
