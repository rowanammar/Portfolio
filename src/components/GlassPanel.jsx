import React from "react";

export default function GlassPanel({ open, onClose, children, color = "var(--accent)" }) {
  return (
    <div className={`glass-overlay${open ? " open" : ""}`}>
      <div
        className="glass-panel-futuristic"
        style={{
          borderColor: color,
          boxShadow: `0 0 32px 4px ${color}99, 0 0 0 2.5px ${color}`,
        }}
      >
        <button
          className="close-btn-futuristic"
          style={{
            color: color,
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}