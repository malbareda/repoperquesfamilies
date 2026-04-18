import { useState, useEffect, useRef } from "react";

const WHYS = [
  {
    statement: "El mètode dels 5 Per Què funciona.",
    question: "Per què funciona?",
    answer: "Perquè identifica la causa arrel d'un problema, no només els símptomes.",
    emoji: "🎯",
  },
  {
    statement: "Identifica la causa arrel, no els símptomes.",
    question: "Per què identifica la causa arrel?",
    answer: "Perquè cada pregunta obliga a anar un nivell més profund en la cadena causal.",
    emoji: "🔗",
  },
  {
    statement: "Cada pregunta obliga a anar més profund.",
    question: "Per què anar més profund ajuda?",
    answer: "Perquè els problemes superficials són conseqüències d'errors sistèmics ocults.",
    emoji: "🧊",
  },
  {
    statement: "Els problemes superficials vénen d'errors sistèmics ocults.",
    question: "Per què hi ha errors sistèmics ocults?",
    answer: "Perquè les organitzacions tendeixen a solucionar el que és visible i urgent, no el que és important.",
    emoji: "👁️",
  },
  {
    statement: "Es soluciona el visible i urgent, no l'important.",
    question: "Per què passa això?",
    answer: "Perquè sense una disciplina de preguntar 'Per què?' sistemàticament, el cervell humà es conforma amb la primera explicació que troba.",
    emoji: "🧠",
  },
];

const CONCLUSION = {
  title: "Per això existeixen els 5 Per Què!",
  text: "Taiichi Ohno va crear aquest mètode a Toyota perquè va entendre que el nostre cervell és mandrós: es conforma amb la primera resposta. Forçar-nos a preguntar \"Per què?\" cinc vegades ens porta des del símptoma fins al sistema.",
  loop: "I acabem de demostrar-ho: hem explicat els 5 Per Què... fent servir els 5 Per Què. 🔄",
};

export default function FiveWhysMeta() {
  const [step, setStep] = useState(-1);
  const [revealing, setRevealing] = useState(false);
  const [ripple, setRipple] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [step, revealing]);

  const handleClick = () => {
    if (ripple) return;
    setRipple(true);

    setTimeout(() => {
      if (step === -1) {
        setStep(0);
        setRevealing(false);
      } else if (!revealing) {
        setRevealing(true);
      } else {
        if (step < WHYS.length - 1) {
          setStep(step + 1);
          setRevealing(false);
        } else {
          setStep(WHYS.length);
        }
      }
      setRipple(false);
    }, 300);
  };

  const reset = () => {
    setStep(-1);
    setRevealing(false);
  };

  const finished = step === WHYS.length;

  const layerColors = ["#E53935", "#F4511E", "#FB8C00", "#43A047", "#1E88E5"];
  const bgColors = ["#2a1a1a", "#2a1f1a", "#2a261a", "#1a2a1c", "#1a1f2a"];

  const buttonLabel = () => {
    if (step === -1) return "Per què?";
    if (!revealing) return "Per què?";
    if (step < WHYS.length - 1) return "Per què?";
    return "Eureka! 💡";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0f",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e8e8e8",
      padding: "32px 16px 120px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

        * { box-sizing: border-box; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes expandIn {
          from { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-top: 0; }
          to { opacity: 1; max-height: 200px; padding-top: 14px; padding-bottom: 14px; margin-top: 12px; }
        }
        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 24px var(--glow), 0 0 64px var(--glow-soft); transform: scale(1); }
          50% { box-shadow: 0 0 40px var(--glow), 0 0 90px var(--glow-soft); transform: scale(1.03); }
        }
        @keyframes pressDown {
          0% { transform: scale(1); }
          50% { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        @keyframes fadeBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(720deg); opacity: 0; }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        .why-btn {
          --glow: rgba(229, 57, 53, 0.45);
          --glow-soft: rgba(229, 57, 53, 0.15);
          position: relative;
          border: none;
          background: linear-gradient(135deg, #E53935, #C62828);
          color: white;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: clamp(26px, 6vw, 38px);
          padding: 22px 56px;
          border-radius: 24px;
          cursor: pointer;
          animation: breathe 2.5s ease-in-out infinite;
          letter-spacing: 1.5px;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          transition: filter 0.15s;
        }
        .why-btn:hover { filter: brightness(1.15); }
        .why-btn.pressed { animation: pressDown 0.3s ease-out; }

        .statement-card {
          animation: slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          border-radius: 18px;
          padding: 20px 22px;
          position: relative;
          overflow: hidden;
        }
        .answer-reveal {
          animation: expandIn 0.5s ease-out forwards;
          overflow: hidden;
          border-radius: 12px;
          padding: 14px 18px;
        }
        .depth-line {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 5px;
          border-radius: 0 4px 4px 0;
        }
        .layer-number {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 72px;
          position: absolute;
          right: 16px; top: 8px;
          opacity: 0.06;
          line-height: 1;
        }
        .connector {
          width: 3px;
          height: 28px;
          margin: 0 auto;
          opacity: 0.4;
          animation: slideUp 0.3s ease-out;
        }
        .finish-card {
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          border-radius: 24px;
          padding: 36px 28px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
      `}</style>

      {/* BG glow that changes color with depth */}
      {step >= 0 && step < WHYS.length && (
        <div key={step} style={{
          position: "fixed", inset: 0,
          background: `radial-gradient(ellipse at 50% 80%, ${bgColors[Math.min(step, 4)]} 0%, transparent 70%)`,
          animation: "fadeBg 0.8s ease-out",
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 540, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 600,
            color: "#E53935",
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 6,
          }}>Mètode Toyota</div>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(32px, 7vw, 50px)",
            fontWeight: 900,
            margin: 0,
            color: "#fff",
            lineHeight: 1.1,
          }}>Els 5 Per Què?</h1>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "#777",
            marginTop: 10,
            lineHeight: 1.5,
          }}>
            Expliquem el mètode... fent-lo servir sobre si mateix.
          </p>
        </div>

        {/* Intro */}
        {step === -1 && (
          <div style={{
            textAlign: "center",
            animation: "slideUp 0.5s ease-out",
            padding: "20px 0 32px",
          }}>
            <div style={{
              background: "rgba(229,57,53,0.07)",
              border: "1px solid rgba(229,57,53,0.2)",
              borderRadius: 18,
              padding: "28px 24px",
              marginBottom: 36,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🏭</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#fff",
                marginBottom: 6,
              }}>Afirmació inicial</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 17,
                color: "#ef9a9a",
                lineHeight: 1.5,
              }}>
                "{WHYS[0].statement}"
              </div>
            </div>

            <button className="why-btn" onClick={handleClick}>
              Per què?
            </button>
          </div>
        )}

        {/* Chain */}
        {step >= 0 && !finished && (
          <div>
            {WHYS.slice(0, step + 1).map((w, i) => {
              const color = layerColors[i];
              const isCurrent = i === step;
              const showAns = i < step || (isCurrent && revealing);

              return (
                <div key={i}>
                  {i > 0 && (
                    <div className="connector" style={{ background: color }} />
                  )}
                  <div className="statement-card" style={{
                    background: isCurrent ? `rgba(255,255,255,0.06)` : `rgba(255,255,255,0.025)`,
                    border: `1px solid ${isCurrent ? color + '55' : 'rgba(255,255,255,0.06)'}`,
                    opacity: isCurrent ? 1 : 0.55,
                    transition: "opacity 0.4s, border-color 0.4s",
                  }}>
                    <div className="depth-line" style={{ background: color }} />
                    <div className="layer-number" style={{ color }}>{i + 1}</div>

                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 700,
                      color,
                      letterSpacing: 2,
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}>Per què #{i + 1}</div>

                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 300,
                      fontSize: 13,
                      color: "#888",
                      marginBottom: 6,
                      fontStyle: "italic",
                    }}>{w.statement}</div>

                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}>
                      <span style={{ fontSize: 24 }}>{w.emoji}</span>
                      {w.question}
                    </div>

                    {showAns && (
                      <div className="answer-reveal" style={{
                        background: `${color}11`,
                        borderLeft: `3px solid ${color}`,
                      }}>
                        <div style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 15,
                          color: "#ccc",
                          lineHeight: 1.6,
                        }}>
                          {w.answer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Button */}
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                color: "#555",
                marginBottom: 14,
              }}>
                {!revealing
                  ? `Nivell ${step + 1} de 5 — Descobreix la resposta`
                  : step < WHYS.length - 1
                    ? `Nivell ${step + 1} de 5 — Aprofundeix`
                    : "Nivell 5 de 5 — Descobreix la conclusió"}
              </div>
              <button
                className={`why-btn${ripple ? ' pressed' : ''}`}
                onClick={handleClick}
              >
                {buttonLabel()}
              </button>
            </div>
          </div>
        )}

        {/* Conclusion */}
        {finished && (
          <div>
            {/* Mini progress dots */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginBottom: 24,
              animation: "slideUp 0.3s ease-out",
            }}>
              {WHYS.map((w, i) => (
                <div key={i} style={{
                  width: 38, height: 38,
                  borderRadius: 12,
                  background: layerColors[i],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  boxShadow: `0 2px 10px ${layerColors[i]}44`,
                }}>{w.emoji}</div>
              ))}
            </div>

            <div className="finish-card" style={{
              background: "linear-gradient(135deg, rgba(30,136,229,0.12), rgba(67,160,71,0.12))",
              border: "1px solid rgba(30,136,229,0.25)",
            }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🔄</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 26,
                color: "#fff",
                marginBottom: 16,
              }}>{CONCLUSION.title}</div>

              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: "#bbb",
                lineHeight: 1.7,
                marginBottom: 20,
                maxWidth: 460,
                margin: "0 auto 20px",
              }}>{CONCLUSION.text}</div>

              <div style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 28,
                border: "1px dashed rgba(255,255,255,0.15)",
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 15,
                  color: "#90CAF9",
                  lineHeight: 1.6,
                }}>{CONCLUSION.loop}</div>
              </div>

              <button onClick={reset} style={{
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
                color: "#aaa",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                padding: "12px 32px",
                borderRadius: 14,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#aaa"; }}
              >
                🔄 Torna a començar
              </button>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
