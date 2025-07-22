import React, { useEffect, useRef, useState } from "react";
import "./aboutpanel.css";

const TYPING_SPEED = 110; // slower typing speed
const TRANSITION_DELAY = 700; // slower transition between lines

const sequence = [
  { type: "command", text: "whoami" },
  { type: "output", text: "Rawan Ehab" },
  { type: "command", text: "ls" },
  { type: "output", text: "about.txt  skills.txt  hobbies.txt" },
  { type: "command", text: "cat about.txt" },
  {
    type: "output",
    text: "A senior Computer Science student at Cairo University. Loves learning, building things, and any form of self-expression. \nFavorite color: <span class='cherry-red'>cherry red</span>.",
  },
  { type: "command", text: "cat skills.txt" },
  {
    type: "output",
    text: `Programming languages: Python, C++, Java, JavaScript, PHP\nTechnologies: AWS, Django, Docker, Git, Linux, MySQL, Vite, React, Vercel\nCurrently studying: AWS Cloud Architecture`,
  },
  { type: "command", text: "cat hobbies.txt" },
  {
    type: "output",
    text: `Music lover — Favorite band: Linkin Park\nReading — Favorite book: The Brothers Karamazov, Favorite series: Sherlock Holmes , Favorite author: Fyodor Dostoevsky\nFormula 1 enthusiast — Favorite team: Mercedes AMG\nAnime & Movie fan — Favorite anime: Case Closed`,
  },
];

function AboutPanel({ theme = "blue", accentColor = "#00faff" }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const typeSequence = async () => {
      let lines = [];
      for (let i = 0; i < sequence.length; i++) {
        if (cancelled) return;
        const { type, text } = sequence[i];
        if (type === "command") {
          let prompt = `<span class='user'>rawan@cairo-university</span>:<span class='symbol'>~$</span> `;
          let current = "";
          for (let j = 0; j < text.length; j++) {
            current = text.slice(0, j + 1);
            setDisplayedLines([...lines, prompt + `<span class='typed'>${current}</span>`]);
            await new Promise((r) => setTimeout(r, TYPING_SPEED));
          }
          lines.push(prompt + `<span class='typed'>${text}</span>`);
          setDisplayedLines([...lines]);
        } else if (type === "output") {
          lines.push(`<span class='command-output'>${text.replace(/\n/g, '<br/>')}</span>`);
          setDisplayedLines([...lines]);
        }
        await new Promise((r) => setTimeout(r, TRANSITION_DELAY));
      }
      setIsTyping(false);
    };

    setDisplayedLines([]);
    setIsTyping(true);
    typeSequence();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [displayedLines]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <span className="terminal-btn red"></span>
        <span className="terminal-btn yellow"></span>
        <span className="terminal-btn green"></span>
        <span className="terminal-title">rawan@cairo-university: ~</span>
      </div>
      <div className="terminal-body" ref={containerRef}>
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={line.includes("user") ? "prompt-line" : "command-output"}
            dangerouslySetInnerHTML={{ __html: line }}
          >
          </div>
        ))}
        {isTyping && cursorVisible && <span className="terminal-cursor" />}
      </div>
    </div>
  );
}

export default AboutPanel;
