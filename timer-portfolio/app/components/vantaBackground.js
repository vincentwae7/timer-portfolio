"use client"; // <-- Tetap pastikan ini ada di baris pertama

import { useEffect, useRef } from "react"; // <-- Kita tidak butuh useState
import * as THREE from "three";
import VANTA_CLOUDS2 from "vanta/dist/vanta.clouds2.min.js";

const VantaBackground = () => {
  // Kita gunakan useRef untuk DOM element
  const vantaRef = useRef(null);

  // Kita gunakan useRef untuk menyimpan efek Vanta (BUKAN useState)
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    // Hanya jalankan jika efek belum dibuat DAN DOM element sudah ada
    if (!vantaEffectRef.current && vantaRef.current) {
      // Buat efeknya dan simpan di ref
      vantaEffectRef.current = VANTA_CLOUDS2({
        el: vantaRef.current,
        THREE: THREE, // Berikan library THREE
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        skyColor: 0x5ca6ca,
        cloudColor: 0x334d80,
        speed: 1.4,
        texturePath: "/noise.png", // Path eksplisit yang sudah kita perbaiki
      });
    }

    // Cleanup function saat komponen di-unmount
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy(); // Hancurkan efek
        vantaEffectRef.current = null; // Bersihkan ref
      }
    };
  }, []); // <-- DEPENDENCY ARRAY KOSONG. Ini SANGAT PENTING.
  // Ini memastikan useEffect hanya berjalan SEKALI saat mount.

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
