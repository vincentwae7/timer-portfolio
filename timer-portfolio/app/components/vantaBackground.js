// app/components/VantaBackground.js
"use client"; // <-- Tetap pastikan ini ada di baris pertama

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
// Penting: Impor Vanta effect-nya seperti ini
import VANTA_CLOUDS2 from "vanta/dist/vanta.clouds2.min.js";

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    // Hanya jalankan jika vantaEffect belum ada DAN vantaRef sudah ter-mount
    if (!vantaEffect && vantaRef.current) {
      const effect = VANTA_CLOUDS2({
        el: vantaRef.current,
        THREE: THREE, // Berikan library THREE
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,

        // --- KUSTOMISASI ANDA DARI SCREENSHOT ---
        // (Saya konversi 0x... menjadi 0x... karena JS butuh format itu)
        skyColor: 0x5ca6ca,
        cloudColor: 0x334d80,
        speed: 1.4,
        // ----------------------------------------
      });
      setVantaEffect(effect);
    }

    // Cleanup function saat komponen di-unmount
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]); // Dependency array

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1, // Pastikan dia ada di paling belakang
      }}
    />
  );
};

export default VantaBackground;
