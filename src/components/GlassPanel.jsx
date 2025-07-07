import React from "react";

export default function GlassPanel({ open, onClose, children, color = "#00f2fe" }) {
  return (
    <div className={`glass-overlay${open ? " open" : ""}`}>
      <div className="glass-panel-futuristic" style={{ borderColor: color, boxShadow: `0 0 32px 4px ${color}99, 0 0 0 2.5px ${color}` }}>
        <button className="close-btn-futuristic" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
} 