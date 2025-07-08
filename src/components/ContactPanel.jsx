import './ContactPanel.css';

export default function ContactPanel() {
  return (
    <div className="contact-panel-outer">
      <h2 className="contact-heading">Contact Me</h2>
      <div className="contact-panel-inner">
        {/* LinkedIn */}
        <div className="light-button linkedin">
          <a href="https://www.linkedin.com/in/rawan523" target="_blank" rel="noopener noreferrer">
            <button className="bt">
              <div className="light-holder">
                <div className="dot"></div>
                <div className="light"></div>
              </div>
              <div className="button-holder">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.381-.112-2.623-2-2.623-1.887 0-2.171 1.146-2.171 2.537v5.586h-3v-11h2.842v1.522h.034c.396-.745 1.35-1.522 2.807-1.522 3.034 0 3.621 1.988 3.621 4.577v6.423z" />
                </svg>
                <p>LinkedIn</p>
              </div>
            </button>
          </a>
        </div>
        {/* GitHub */}
        <div className="light-button github">
          <a href="https://github.com/rowanammar" target="_blank" rel="noopener noreferrer">
            <button className="bt">
              <div className="light-holder">
                <div className="dot"></div>
                <div className="light github"></div>
              </div>
              <div className="button-holder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" height="50">
                  <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
                </svg>
                <p>GitHub</p>
              </div>
            </button>
          </a>
        </div>
        {/* Gmail */}
        <div className="light-button gmail">
          <a href="mailto:rawanehab523@gmail.com" target="_blank" rel="noopener noreferrer">
            <button className="bt">
              <div className="light-holder">
                <div className="dot"></div>
                <div className="light gmail"></div>
              </div>
              <div className="button-holder">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="50" viewBox="0 0 32 32">
                  <path d="M28 5H4c-1.104 0-2 0.896-2 2v18c0 1.104 0.896 2 2 2h24c1.104 0 2-0.896 2-2V7c0-1.104-0.896-2-2-2zm0 2v2.382l-12 7.5-12-7.5V7h24zm0 18H4V9.618l12 7.5 12-7.5V25z" />
                </svg>
                <p>Gmail</p>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
} 