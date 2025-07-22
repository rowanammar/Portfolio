import React from "react";

export default function DevOpsPanel({ accentColor = "var(--accent)" }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
      <h2 style={{
        fontFamily: 'Orbitron, Share Tech Mono, monospace',
        color: accentColor,
        fontSize: '2.2rem',
        letterSpacing: '0.08em',
        textShadow: `0 0 16px ${accentColor}99, 0 0 32px #1a4fff44`,
        marginBottom: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
      }}>
      
        AWS Cloud Badges
      </h2>
      <div style={{
        background: 'linear-gradient(90deg, #0a0f1a 60%, var(--background-color) 100%)',
        border: `2px solid ${accentColor}`,
        borderRadius: '18px',
        boxShadow: `0 0 32px 4px ${accentColor}33, 0 0 0 2.5px ${accentColor}`,
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
            color: accentColor,
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.04em',
            border: `2px solid ${accentColor}`,
            borderRadius: '14px',
            background: 'linear-gradient(120deg, #0a0f1a 80%, var(--background-color) 100%)',
            boxShadow: `0 0 16px ${accentColor}33`,
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
            color: accentColor,
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.04em',
            border: `2px solid ${accentColor}`,
            borderRadius: '14px',
            background: 'linear-gradient(120deg, #0a0f1a 80%, var(--background-color) 100%)',
            boxShadow: `0 0 16px ${accentColor}33`,
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
        textShadow: '0 0 8px var(--accent)',
      }}>
        <span style={{ color: 'var(--prompt-line-user)', fontWeight: 600 }}>Showcasing AWS skills</span> —
        <br />
        Each badge above is earned and verified via <a href="https://www.credly.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'underline', textShadow: '0 0 8px #4facfe88' }}>Credly</a>.
      </div>
    </div>
  );
}