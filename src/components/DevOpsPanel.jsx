import React from "react";

export default function DevOpsPanel() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
      <h2 style={{
        fontFamily: 'Orbitron, Share Tech Mono, monospace',
        color: '#00faff',
        fontSize: '2.2rem',
        letterSpacing: '0.08em',
        textShadow: '0 0 16px #00faff99, 0 0 32px #1a4fff44',
        marginBottom: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
      }}>
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px #00faff)' }}>
          <circle cx="19" cy="19" r="18" stroke="#00faff" strokeWidth="2.5" fill="#0a0f1a" />
          <path d="M10 24C12 18 26 18 28 24" stroke="#00faff" strokeWidth="2" strokeLinecap="round"/>
          <ellipse cx="19" cy="15" rx="6" ry="4" fill="#00faff33" stroke="#00faff" strokeWidth="1.2"/>
        </svg>
        AWS Cloud Badges
      </h2>
      <div style={{
        background: 'linear-gradient(90deg, #0a0f1a 60%, #1a4fff22 100%)',
        border: '2px solid #00faff',
        borderRadius: '18px',
        boxShadow: '0 0 32px 4px #00faff33, 0 0 0 2.5px #00faff',
        padding: '2.2rem 2.5rem',
        marginBottom: '1.2rem',
        minWidth: 320,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '90vw',
      }}>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0.5rem 0',
        }}>
          {/* === AWS BADGE 1 FRAME === */}
          <div style={{
            minHeight: 80,
            minWidth: 150,
            maxWidth: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00faff',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.04em',
            border: '2px solid #00faff',
            borderRadius: '14px',
            background: 'linear-gradient(120deg, #0a0f1a 80%, #1a4fff22 100%)',
            boxShadow: '0 0 16px #00faff33',
            padding: '1.1rem 1.2rem',
            margin: '0.2rem',
            position: 'relative',
            transition: 'box-shadow 0.2s',
          }}>
            <div data-iframe-width="150" data-iframe-height="150" data-share-badge-id="b2e1f9ac-b9d4-4126-87e3-c0f68e2aaa97" data-share-badge-host="https://www.credly.com"></div>
            <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
          </div>
          {/* === AWS BADGE 2 FRAME === */}
          <div style={{
            minHeight: 80,
            minWidth: 150,
            maxWidth: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00faff',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.04em',
            border: '2px solid #00faff',
            borderRadius: '14px',
            background: 'linear-gradient(120deg, #0a0f1a 80%, #1a4fff22 100%)',
            boxShadow: '0 0 16px #00faff33',
            padding: '1.1rem 1.2rem',
            margin: '0.2rem',
            position: 'relative',
            transition: 'box-shadow 0.2s',
          }}>
            <div data-iframe-width="150" data-iframe-height="150" data-share-badge-id="71239887-1422-465a-8bbf-9c0efdbf44cc" data-share-badge-host="https://www.credly.com"></div>
            <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
          </div>
        </div>
      </div>
      <div style={{
        color: '#b1d3ff',
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '1.02rem',
        textAlign: 'center',
        maxWidth: 420,
        marginTop: '0.5rem',
        textShadow: '0 0 8px #00faff33',
      }}>
        <span style={{ color: '#00faff', fontWeight: 600 }}>Showcasing AWS skills</span> —
        <br />
        Each badge above is earned and verified via <a href="https://www.credly.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'underline', textShadow: '0 0 8px #4facfe88' }}>Credly</a>.
      </div>
    </div>
  );
} 