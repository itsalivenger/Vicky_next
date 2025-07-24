"use client";

import { useMemo, useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = ({ theme }) => {
  const customInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = useMemo(() => ({
    background: {
      color: theme === "dark" ? "#000" : "#fff",
    },
    particles: {
      links: {
        color: theme === "dark" ? "#fff" : "#000",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      number: {
        value: 50,
        density: { enable: true, area: 800 },
      },
      color: { value: theme === "dark" ? "#fff" : "#000" },
      shape: { type: "circle" },
      size: { value: 1 },
      move: { enable: true, speed: 2 },
      opacity: { value: 0.5 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
      },
    },
    detectRetina: true,
  }), [theme]);

  return <Particles key={theme} id="tsparticles" init={customInit} options={options} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ParticlesBackground;
