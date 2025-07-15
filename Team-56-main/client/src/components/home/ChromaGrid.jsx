import { useRef, useEffect } from "react";

const ChromaGrid = ({
  items,
  className = "",
  radius = 120,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      image: "https://i.pravatar.cc/200?img=8",
      title: "Alex Rivera",
      subtitle: "Senior Developer",
      url: "https://example.com/alex-rivera",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #EBF8FF, #3B82F6)",
    },
    {
      image: "https://i.pravatar.cc/200?img=11",
      title: "Sam Chen",
      subtitle: "UI/UX Designer",
      url: "https://example.com/sam-chen",
      borderColor: "#60A5FA",
      gradient: "linear-gradient(210deg, #DBEAFE, #60A5FA)",
    },
    {
      image: "https://i.pravatar.cc/200?img=3",
      title: "Jordan Smith",
      subtitle: "Product Manager",
      url: "https://example.com/jordan-smith",
      borderColor: "#2563EB",
      gradient: "linear-gradient(165deg, #EFF6FF, #2563EB)",
    },
    {
      image: "https://i.pravatar.cc/200?img=16",
      title: "Taylor Johnson",
      subtitle: "DevOps Engineer",
      url: "https://example.com/taylor-johnson",
      borderColor: "#1D4ED8",
      gradient: "linear-gradient(195deg, #F0F9FF, #1D4ED8)",
    },
    {
      image: "https://i.pravatar.cc/200?img=9",
      title: "Casey Park",
      subtitle: "Data Scientist",
      url: "https://example.com/casey-park",
      borderColor: "#1E40AF",
      gradient: "linear-gradient(225deg, #F8FAFC, #1E40AF)",
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    if (el.style) {
      el.style.setProperty("--x", `${pos.current.x}px`);
      el.style.setProperty("--y", `${pos.current.y}px`);
    }
  }, []);

  const moveTo = (x, y) => {
    pos.current = { x, y };
    const el = rootRef.current;

    if (el && el.style) {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    }
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);

    if (fadeRef.current) {
      fadeRef.current.style.opacity = "0";
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      fadeRef.current.style.opacity = "1";
    }
  };

  const handleCardClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full flex flex-wrap justify-center items-center gap-2 p-2 ${className}`}
      style={{
        "--r": `${radius}px`,
        "--x": "50%",
        "--y": "50%",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
        minHeight: "100vh",
      }}
    >
      {data.map((card, index) => (
        <article
          key={index}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(card.url)}
          className="group relative flex flex-col w-[240px] h-[320px] rounded-3xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
          style={{
            "--card-border": card.borderColor || "transparent",
            background: `linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)), ${card.gradient}`,
            "--spotlight-color": "rgba(59, 130, 246, 0.3)",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
          }}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle 50px at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
            }}
          />

          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: `linear-gradient(90deg, ${card.borderColor}, transparent, ${card.borderColor})`,
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
            }}
          />

          {/* Image container */}
          <div className="relative z-10 flex-1 p-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Card footer */}
          <footer className="relative z-10 p-4 text-white font-sans space-y-2">
            <div className="relative">
              <h3 className="text-lg font-bold leading-tight tracking-wide group-hover:text-blue-100 transition-colors duration-300">
                {card.title}
              </h3>
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: card.borderColor }}
              />
            </div>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              {card.subtitle}
            </p>
          </footer>

          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none z-5" />
        </article>
      ))}

      {/* Enhanced mask overlay for fade effect */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: "blur(0.3px) grayscale(0.3) brightness(0.9)",
          WebkitBackdropFilter: "blur(0.3px) grayscale(0.3) brightness(0.9)",
          background: "rgba(30, 58, 138, 0.02)",
          maskImage: `radial-gradient(
            circle var(--r) at var(--x) var(--y),
            transparent 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.05) 55%,
            rgba(0, 0, 0, 0.15) 70%,
            rgba(0, 0, 0, 0.3) 80%,
            rgba(0, 0, 0, 0.5) 90%,
            rgba(0, 0, 0, 0.8) 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle var(--r) at var(--x) var(--y),
            transparent 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.05) 55%,
            rgba(0, 0, 0, 0.15) 70%,
            rgba(0, 0, 0, 0.3) 80%,
            rgba(0, 0, 0, 0.5) 90%,
            rgba(0, 0, 0, 0.8) 100%
          )`,
        }}
      />

      {/* Enhanced fade overlay */}
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-40"
        style={{
          backdropFilter: "blur(0.2px) grayscale(0.2) brightness(0.95)",
          WebkitBackdropFilter: "blur(0.2px) grayscale(0.2) brightness(0.95)",
          background: "rgba(59, 130, 246, 0.008)",
          maskImage: `radial-gradient(
            circle var(--r) at var(--x) var(--y),
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.98) 40%,
            rgba(255, 255, 255, 0.9) 55%,
            rgba(255, 255, 255, 0.8) 70%,
            rgba(255, 255, 255, 0.6) 80%,
            rgba(255, 255, 255, 0.4) 90%,
            transparent 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle var(--r) at var(--x) var(--y),
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.98) 40%,
            rgba(255, 255, 255, 0.9) 55%,
            rgba(255, 255, 255, 0.8) 70%,
            rgba(255, 255, 255, 0.6) 80%,
            rgba(255, 255, 255, 0.4) 90%,
            transparent 100%
          )`,
          opacity: 1,
        }}
      />

      {/* Floating particles background effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-300/25 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChromaGrid;
