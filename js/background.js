(function () {
  const symbols = [
    "/images/knit-back.svg",
    "/images/tuck-back.svg",
    "/images/drop.svg",
  ];
  const config = {
    count: 8,
    minSize: 30,
    maxSize: 100,
    minOpacity: 0.05,
    maxOpacity: 0.2,
  };

  // Seeded random for consistent layout
  let seed = 42;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

  const overlay = document.querySelector(".svg-overlay");
  if (!overlay) return;

  // Create symbols in grid cells
  const cells = Array.from({ length: 16 }, (_, i) => ({
    row: Math.floor(i / 4),
    col: i % 4,
  }));

  // Shuffle and pick cells
  for (let i = 15; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  cells.slice(0, config.count).forEach(({ row, col }) => {
    const img = document.createElement("img");
    img.src = symbols[Math.floor(rand() * symbols.length)];
    img.alt = "";
    img.setAttribute("aria-hidden", "true");

    Object.assign(img.style, {
      position: "absolute",
      left: `${col * 25 + rand() * 20 + 2.5}%`,
      top: `${row * 25 + rand() * 20 + 2.5}%`,
      width: `${config.minSize + rand() * (config.maxSize - config.minSize)}px`,
      height: "auto",
      transform: `translate(-50%, -50%) rotate(${rand() * 360}deg)`,
      opacity:
        config.minOpacity + rand() * (config.maxOpacity - config.minOpacity),
    });

    overlay.appendChild(img);
  });
})();
