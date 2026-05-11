"use client";

import { useState, useRef } from "react";
import { menus, questions } from "./data";

interface Menu {
  name: string;
  category: string;
  reason: string;
}

type ScoreCategory = "spicy" | "comfort" | "heavy" | "light";

// SVG Icons
const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const SpicyIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const ComfortIcon = () => (
  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" y1="2" x2="6" y2="4"/>
    <line x1="10" y1="2" x2="10" y2="4"/>
    <line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
);

const HeavyIcon = () => (
  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
);

const LightIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const AppLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="128" fill="url(#app-grad)"/>
    <path d="M120 280H392" stroke="white" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M360 280V304C360 361.438 313.438 408 256 408C198.562 408 152 361.438 152 304V280" stroke="white" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M256 160V224" stroke="white" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M176 176V224" stroke="white" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M336 176V224" stroke="white" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="app-grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316"/>
        <stop offset="1" stopColor="#FBBF24"/>
      </linearGradient>
    </defs>
  </svg>
);

// Large Category Art Components
const KapraoArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FEF2F2" />
    {/* Plate */}
    <ellipse cx="100" cy="140" rx="70" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="65" ry="22" fill="#FFFFFF" />
    {/* Rice */}
    <path d="M50 135 C 50 110, 100 100, 110 135 Z" fill="#F9FAFB" />
    <path d="M55 130 C 65 105, 110 110, 115 135 Z" fill="#F3F4F6" />
    {/* Kaprao Meat (Brown blobs) */}
    <path d="M90 145 C 80 120, 140 120, 140 145 Z" fill="#78350F" />
    <path d="M100 150 C 90 130, 150 130, 145 150 Z" fill="#92400E" />
    {/* Basil Leaves (Green) */}
    <path d="M110 125 Q 120 115 130 125 Q 120 135 110 125" fill="#15803D" />
    <path d="M125 135 Q 135 125 145 135 Q 135 145 125 135" fill="#166534" />
    <path d="M95 130 Q 100 120 110 125 Q 100 135 95 130" fill="#15803D" />
    {/* Chili (Red) */}
    <path d="M120 140 L 130 135" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    <path d="M105 135 L 115 145" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    <path d="M135 145 L 140 140" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    {/* Fried Egg */}
    <path d="M60 125 C 55 110, 85 105, 95 115 C 105 125, 90 140, 70 135 C 60 130, 65 135, 60 125 Z" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1" />
    <circle cx="78" cy="120" r="10" fill="#F59E0B" />
    <circle cx="75" cy="117" r="3" fill="#FCD34D" />
  </svg>
);

const PorridgeArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFFBEB" />
    {/* Steam */}
    <path d="M85 70 Q 95 50 85 30" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M115 70 Q 105 50 115 30" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M100 65 Q 110 45 100 25" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    {/* Bowl Back */}
    <ellipse cx="100" cy="110" rx="60" ry="20" fill="#93C5FD" />
    {/* Porridge/Soup */}
    <ellipse cx="100" cy="110" rx="55" ry="17" fill="#F9FAFB" />
    {/* Pork balls */}
    <circle cx="85" cy="108" r="6" fill="#E5E7EB" />
    <circle cx="105" cy="112" r="7" fill="#E5E7EB" />
    <circle cx="118" cy="105" r="5" fill="#E5E7EB" />
    {/* Coriander */}
    <circle cx="95" cy="105" r="2" fill="#22C55E" />
    <circle cx="98" cy="103" r="2" fill="#16A34A" />
    <circle cx="92" cy="108" r="2" fill="#22C55E" />
    {/* Fried Garlic */}
    <circle cx="110" cy="106" r="1.5" fill="#B45309" />
    <circle cx="113" cy="108" r="1.5" fill="#D97706" />
    <circle cx="108" cy="104" r="1.5" fill="#B45309" />
    {/* Bowl Front */}
    <path d="M40 110 C 40 160, 160 160, 160 110 Z" fill="#60A5FA" />
    <path d="M60 150 C 80 165, 120 165, 140 150 Z" fill="#3B82F6" />
  </svg>
);

const MookrataArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFF7ED" />
    {/* Charcoal/Stove Base */}
    <path d="M50 130 L 60 160 L 140 160 L 150 130 Z" fill="#4B5563" />
    <path d="M60 130 L 70 145 L 130 145 L 140 130 Z" fill="#EF4444" />
    <path d="M80 130 L 85 140 L 115 140 L 120 130 Z" fill="#F59E0B" />
    {/* Soup Trough */}
    <ellipse cx="100" cy="125" rx="75" ry="25" fill="#D97706" />
    <ellipse cx="100" cy="125" rx="70" ry="22" fill="#FEF3C7" />
    {/* Veggies in Soup */}
    <path d="M40 125 Q 50 115 60 125 Z" fill="#22C55E" />
    <path d="M140 120 Q 150 130 160 120 Z" fill="#16A34A" />
    <circle cx="50" cy="135" r="4" fill="#F87171" />
    <circle cx="150" cy="130" r="4" fill="#F87171" />
    {/* Brass Dome */}
    <path d="M55 125 C 55 60, 145 60, 145 125 Z" fill="#FBBF24" />
    {/* Grill Lines */}
    <path d="M100 70 L 100 125" stroke="#D97706" strokeWidth="2" />
    <path d="M85 75 L 80 125" stroke="#D97706" strokeWidth="2" />
    <path d="M115 75 L 120 125" stroke="#D97706" strokeWidth="2" />
    <path d="M70 85 L 60 125" stroke="#D97706" strokeWidth="2" />
    <path d="M130 85 L 140 125" stroke="#D97706" strokeWidth="2" />
    {/* Meat on Dome */}
    <path d="M85 95 C 80 85, 95 80, 105 90 C 110 100, 95 105, 85 95 Z" fill="#EF4444" />
    <path d="M90 92 C 85 85, 95 82, 100 88 C 105 95, 95 98, 90 92 Z" fill="#FCA5A5" />
    <path d="M110 110 C 105 100, 120 95, 130 105 C 135 115, 120 120, 110 110 Z" fill="#92400E" />
    <path d="M115 107 C 110 100, 120 98, 125 104 C 130 110, 120 112, 115 107 Z" fill="#B45309" />
  </svg>
);

const SomtumArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#ECFDF5" />
    {/* Somtum Plate */}
    <ellipse cx="100" cy="130" rx="70" ry="25" fill="#CCFBF1" />
    <ellipse cx="100" cy="130" rx="60" ry="20" fill="#FFFFFF" />
    {/* Papaya shreds (Green & Orange) */}
    <path d="M60 130 Q 80 110 100 135 Q 120 110 140 130" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M70 120 Q 90 100 110 125 Q 130 115 135 135" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M65 140 Q 85 120 105 145 Q 125 125 130 130" stroke="#A3E635" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M80 115 Q 100 130 120 115" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M90 140 Q 110 120 130 140" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Tomatoes (Red) */}
    <circle cx="80" cy="125" r="8" fill="#EF4444" />
    <path d="M75 125 A 5 5 0 0 0 85 125" fill="#FCA5A5" />
    <circle cx="120" cy="135" r="7" fill="#EF4444" />
    <path d="M115 135 A 4 4 0 0 0 125 135" fill="#FCA5A5" />
    <circle cx="110" cy="118" r="6" fill="#EF4444" />
    {/* Peanuts (Brown) */}
    <circle cx="70" cy="135" r="3" fill="#B45309" />
    <circle cx="95" cy="142" r="3" fill="#B45309" />
    <circle cx="130" cy="122" r="3" fill="#B45309" />
    <circle cx="105" cy="130" r="3" fill="#B45309" />
    {/* Long beans (Dark Green) */}
    <path d="M60 125 L 75 135" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
    <path d="M125 120 L 135 130" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
    {/* Lime */}
    <path d="M135 140 A 10 10 0 0 0 150 130 Z" fill="#A3E635" stroke="#4ADE80" strokeWidth="2" />
  </svg>
);

const NoodleArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFFBEB" />
    <path d="M85 70 Q 95 50 85 30" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M115 70 Q 105 50 115 30" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    {/* Bowl Back */}
    <ellipse cx="100" cy="110" rx="60" ry="20" fill="#FCA5A5" />
    {/* Broth */}
    <ellipse cx="100" cy="110" rx="55" ry="17" fill="#D97706" />
    {/* Noodles */}
    <path d="M60 110 Q 70 100 80 115 T 100 110 T 120 115 T 140 105" stroke="#FEF3C7" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M65 115 Q 75 105 85 120 T 105 115 T 125 120 T 135 110" stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Meatballs */}
    <circle cx="85" cy="105" r="7" fill="#78350F" />
    <circle cx="115" cy="108" r="7" fill="#78350F" />
    {/* Veggies */}
    <path d="M100 98 Q 110 90 120 100 Q 110 110 100 98" fill="#15803D" />
    <path d="M90 102 Q 80 95 70 105 Q 80 115 90 102" fill="#16A34A" />
    {/* Chopsticks */}
    <line x1="40" y1="125" x2="160" y2="85" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="130" x2="165" y2="90" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    {/* Bowl Front */}
    <path d="M40 110 C 40 160, 160 160, 160 110 Z" fill="#EF4444" />
    <path d="M60 150 C 80 165, 120 165, 140 150 Z" fill="#B91C1C" />
  </svg>
);

const ShabuArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FEF2F2" />
    {/* Pot handles */}
    <rect x="20" y="110" width="160" height="10" rx="5" fill="#4B5563" />
    {/* Pot Base */}
    <path d="M30 115 C 30 160, 170 160, 170 115 Z" fill="#9CA3AF" />
    {/* Soup Split */}
    <path d="M35 115 C 35 155, 165 155, 165 115" fill="#EF4444" />
    <path d="M35 115 C 35 155, 100 155, 100 115 C 100 135, 165 135, 165 115 Z" fill="#FBBF24" />
    {/* Divider line */}
    <path d="M35 115 C 65 140, 135 90, 165 115" stroke="#9CA3AF" strokeWidth="5" fill="none" />
    {/* Veggies & Meat */}
    <circle cx="60" cy="125" r="8" fill="#15803D" />
    <circle cx="75" cy="135" r="6" fill="#FCA5A5" />
    <circle cx="130" cy="120" r="7" fill="#16A34A" />
    <circle cx="140" cy="135" r="8" fill="#FCA5A5" />
    {/* Bubbles */}
    <circle cx="80" cy="120" r="2" fill="#FFFFFF" opacity="0.6" />
    <circle cx="50" cy="135" r="3" fill="#FFFFFF" opacity="0.6" />
    <circle cx="120" cy="130" r="2.5" fill="#FFFFFF" opacity="0.6" />
    <circle cx="150" cy="125" r="2" fill="#FFFFFF" opacity="0.6" />
    <path d="M70 100 Q 80 80 70 60" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M130 100 Q 120 80 130 60" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
  </svg>
);

const SaladArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#ECFDF5" />
    <ellipse cx="100" cy="130" rx="70" ry="20" fill="#D1D5DB" />
    <path d="M40 120 C 30 80, 80 60, 100 100 C 120 60, 170 80, 160 120 Z" fill="#22C55E" />
    <path d="M60 130 C 50 90, 100 70, 120 110 C 140 70, 180 90, 140 130 Z" fill="#16A34A" />
    <path d="M80 135 C 70 100, 120 80, 140 120 C 150 90, 190 100, 120 140 Z" fill="#15803D" />
    <circle cx="70" cy="100" r="8" fill="#EF4444" />
    <circle cx="130" cy="110" r="8" fill="#EF4444" />
    <circle cx="100" cy="85" r="8" fill="#EF4444" />
    <ellipse cx="110" cy="120" rx="12" ry="8" fill="#FFFFFF" transform="rotate(-15 110 120)" />
    <circle cx="110" cy="120" r="4" fill="#FBBF24" />
    <ellipse cx="60" cy="115" rx="12" ry="8" fill="#FFFFFF" transform="rotate(30 60 115)" />
    <circle cx="60" cy="115" r="4" fill="#FBBF24" />
    <path d="M30 130 C 30 180, 170 180, 170 130 Z" fill="#F3F4F6" />
  </svg>
);

const KhaoKhaMooArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFF7ED" />
    <ellipse cx="100" cy="140" rx="75" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="70" ry="22" fill="#FFFFFF" />
    <path d="M45 135 C 45 105, 110 100, 115 135 Z" fill="#F9FAFB" />
    <path d="M50 130 C 65 100, 120 105, 125 135 Z" fill="#F3F4F6" />
    <path d="M90 145 C 80 110, 150 110, 155 145 Z" fill="#78350F" />
    <path d="M100 150 C 90 125, 160 120, 155 150 Z" fill="#451A03" />
    <path d="M110 125 C 120 115, 140 115, 150 135" stroke="#B45309" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M100 135 C 110 125, 130 125, 140 145" stroke="#B45309" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="130" cy="115" rx="12" ry="8" fill="#78350F" transform="rotate(-20 130 115)" />
    <ellipse cx="128" cy="115" rx="10" ry="6" fill="#FFFFFF" transform="rotate(-20 128 115)" />
    <circle cx="126" cy="115" r="4" fill="#EA580C" />
    <path d="M70 145 C 60 135, 90 130, 85 150 Z" fill="#166534" />
    <path d="M75 140 C 65 130, 95 125, 90 145 Z" fill="#15803D" />
  </svg>
);

const YumArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FEF2F2" />
    <ellipse cx="100" cy="140" rx="70" ry="25" fill="#CCFBF1" />
    <ellipse cx="100" cy="138" rx="65" ry="22" fill="#FFFFFF" />
    <path d="M50 130 Q 70 110 90 135 T 130 130 T 150 135" stroke="#E5E7EB" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M60 120 Q 80 100 100 125 T 140 120" stroke="#F3F4F6" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M70 140 Q 90 120 110 145 T 150 140" stroke="#E5E7EB" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M80 115 Q 100 95 120 120 T 145 125" stroke="#F3F4F6" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M120 115 C 130 95, 150 110, 140 125 C 130 140, 110 135, 120 115 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" />
    <path d="M70 125 C 60 105, 80 90, 90 110 C 100 130, 80 145, 70 125 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" />
    <circle cx="95" cy="135" r="4" fill="#D4D4D8" />
    <circle cx="105" cy="130" r="5" fill="#D4D4D8" />
    <circle cx="115" cy="138" r="4.5" fill="#D4D4D8" />
    <circle cx="85" cy="130" r="4" fill="#D4D4D8" />
    <path d="M90 110 Q 100 100 110 115" stroke="#9333EA" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M110 130 Q 120 120 130 135" stroke="#9333EA" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M75 110 Q 85 90 95 105" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M125 135 Q 135 115 145 130" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="100" cy="120" r="3" fill="#DC2626" />
    <circle cx="80" cy="115" r="2.5" fill="#DC2626" />
    <circle cx="130" cy="118" r="3" fill="#DC2626" />
  </svg>
);

const TomYumArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FEF2F2" />
    <ellipse cx="100" cy="110" rx="60" ry="20" fill="#FCA5A5" />
    <ellipse cx="100" cy="110" rx="55" ry="17" fill="#EA580C" />
    <path d="M70 110 C 60 90, 90 90, 80 110" stroke="#F97316" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M110 100 C 130 90, 130 115, 115 110" stroke="#F97316" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M90 100 L 105 115" stroke="#A3E635" strokeWidth="4" strokeLinecap="round" />
    <circle cx="95" cy="105" r="3" fill="#EF4444" />
    <circle cx="120" cy="115" r="2" fill="#EF4444" />
    <path d="M40 110 C 40 160, 160 160, 160 110 Z" fill="#EF4444" />
    <path d="M60 150 C 80 165, 120 165, 140 150 Z" fill="#B91C1C" />
  </svg>
);

const OmeletArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFFBEB" />
    <ellipse cx="100" cy="140" rx="70" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="65" ry="22" fill="#FFFFFF" />
    <path d="M50 135 C 50 110, 100 100, 110 135 Z" fill="#F9FAFB" />
    <path d="M45 130 C 40 100, 160 100, 155 135 C 150 155, 50 155, 45 130 Z" fill="#FBBF24" />
    <path d="M55 135 C 55 115, 145 115, 145 135 C 140 145, 60 145, 55 135 Z" fill="#F59E0B" />
    <path d="M70 120 C 80 110, 90 140, 110 115 C 120 105, 130 135, 140 125" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

const LarbArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#ECFDF5" />
    <ellipse cx="100" cy="130" rx="70" ry="25" fill="#CCFBF1" />
    <ellipse cx="100" cy="130" rx="60" ry="20" fill="#FFFFFF" />
    <path d="M50 130 C 50 100, 150 100, 150 130 C 150 150, 50 150, 50 130 Z" fill="#92400E" />
    <path d="M60 130 C 60 110, 140 110, 140 130 C 140 145, 60 145, 60 130 Z" fill="#A16207" />
    <path d="M90 100 C 80 90, 70 110, 90 110 Z" fill="#15803D" />
    <path d="M110 95 C 120 85, 130 105, 110 105 Z" fill="#166534" />
    <path d="M80 125 C 70 115, 60 135, 80 135 Z" fill="#15803D" />
    <ellipse cx="120" cy="125" rx="10" ry="4" stroke="#9333EA" strokeWidth="2" fill="none" transform="rotate(-15 120 125)" />
    <ellipse cx="75" cy="115" rx="8" ry="3" stroke="#9333EA" strokeWidth="2" fill="none" transform="rotate(20 75 115)" />
    <circle cx="100" cy="115" r="2.5" fill="#DC2626" />
    <circle cx="130" cy="130" r="2" fill="#DC2626" />
    <circle cx="70" cy="135" r="2.5" fill="#DC2626" />
  </svg>
);

const MooDaengArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFF7ED" />
    <ellipse cx="100" cy="140" rx="75" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="70" ry="22" fill="#FFFFFF" />
    <path d="M45 135 C 45 105, 110 100, 115 135 Z" fill="#F9FAFB" />
    <path d="M50 130 C 65 100, 120 105, 125 135 Z" fill="#F3F4F6" />
    <path d="M70 140 L 80 110 L 100 115 L 90 145 Z" fill="#EF4444" />
    <path d="M75 138 L 82 112 L 95 116 L 85 142 Z" fill="#FCA5A5" />
    <path d="M90 145 L 100 115 L 120 120 L 110 150 Z" fill="#EF4444" />
    <path d="M95 143 L 102 117 L 115 121 L 105 147 Z" fill="#FCA5A5" />
    <ellipse cx="135" cy="125" rx="12" ry="16" fill="#FFFFFF" transform="rotate(30 135 125)" />
    <ellipse cx="135" cy="125" rx="6" ry="8" fill="#F59E0B" transform="rotate(30 135 125)" />
    <path d="M65 120 C 80 110, 100 130, 120 125" stroke="#78350F" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <ellipse cx="55" cy="140" rx="10" ry="4" fill="#A3E635" stroke="#15803D" strokeWidth="2" transform="rotate(-20 55 140)" />
  </svg>
);

const KhaoManGaiArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFFBEB" />
    <ellipse cx="100" cy="140" rx="75" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="70" ry="22" fill="#FFFFFF" />
    <path d="M45 135 C 45 105, 110 100, 115 135 Z" fill="#FEF3C7" />
    <path d="M50 130 C 65 100, 120 105, 125 135 Z" fill="#FDE68A" />
    <path d="M70 140 C 70 110, 100 115, 90 145 Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
    <path d="M85 145 C 85 115, 115 120, 105 150 Z" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1" />
    <path d="M100 148 C 100 118, 130 123, 120 153 Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
    <circle cx="145" cy="105" r="15" fill="#93C5FD" />
    <circle cx="145" cy="105" r="13" fill="#EFF6FF" />
    <circle cx="145" cy="105" r="2" fill="#16A34A" />
    <ellipse cx="50" cy="135" rx="8" ry="4" fill="#A3E635" stroke="#15803D" strokeWidth="2" transform="rotate(-30 50 135)" />
    <ellipse cx="55" cy="145" rx="8" ry="4" fill="#A3E635" stroke="#15803D" strokeWidth="2" transform="rotate(-15 55 145)" />
  </svg>
);

const CurryArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFF7ED" />
    <ellipse cx="100" cy="115" rx="65" ry="22" fill="#E5E7EB" />
    <ellipse cx="100" cy="115" rx="60" ry="19" fill="#D97706" />
    <ellipse cx="105" cy="117" rx="50" ry="15" fill="#F59E0B" />
    <path d="M70 110 C 65 100, 85 95, 90 110 Z" fill="#78350F" />
    <path d="M110 115 C 105 105, 130 100, 135 115 Z" fill="#B45309" />
    <circle cx="100" cy="125" r="8" fill="#78350F" />
    <circle cx="125" cy="125" r="6" fill="#92400E" />
    <path d="M65 115 C 80 105, 100 130, 130 110" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M35 115 C 35 170, 165 170, 165 115 Z" fill="#F9FAFB" />
    <path d="M55 155 C 75 170, 125 170, 145 155 Z" fill="#E5E7EB" />
  </svg>
);

const FriedRiceArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFFBEB" />
    <ellipse cx="100" cy="140" rx="70" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="65" ry="22" fill="#FFFFFF" />
    <path d="M45 130 C 45 90, 155 90, 155 130 C 155 150, 45 150, 45 130 Z" fill="#FDE68A" />
    <path d="M55 125 C 55 95, 145 95, 145 125 C 145 140, 55 140, 55 125 Z" fill="#FCD34D" />
    <circle cx="80" cy="115" r="3" fill="#22C55E" />
    <circle cx="110" cy="120" r="3" fill="#F97316" />
    <circle cx="120" cy="135" r="3" fill="#22C55E" />
    <circle cx="90" cy="130" r="3" fill="#F97316" />
    <circle cx="70" cy="125" r="3" fill="#22C55E" />
    <circle cx="130" cy="115" r="3" fill="#F97316" />
    <circle cx="100" cy="105" r="3" fill="#22C55E" />
    <path d="M140 145 A 10 10 0 0 0 160 135 Z" fill="#A3E635" stroke="#4ADE80" strokeWidth="2" />
    <ellipse cx="40" cy="135" rx="8" ry="4" fill="#A3E635" stroke="#15803D" strokeWidth="2" transform="rotate(-30 40 135)" />
  </svg>
);

const PadThaiArt = () => (
  <svg className="w-full h-48 md:h-64 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFF7ED" />
    <ellipse cx="100" cy="140" rx="70" ry="25" fill="#E5E7EB" />
    <ellipse cx="100" cy="138" rx="65" ry="22" fill="#FFFFFF" />
    <path d="M50 130 Q 70 100 90 120 T 120 110 T 150 130" stroke="#F59E0B" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M60 140 Q 80 110 100 130 T 130 120 T 140 140" stroke="#D97706" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M55 120 Q 75 90 95 110 T 125 100 T 145 120" stroke="#FBBF24" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M70 120 C 60 100, 90 100, 80 120" stroke="#F97316" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M120 130 C 110 110, 140 110, 130 130" stroke="#F97316" strokeWidth="10" strokeLinecap="round" fill="none" />
    <line x1="45" y1="130" x2="65" y2="140" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    <line x1="135" y1="120" x2="150" y2="110" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    <circle cx="140" cy="140" r="1.5" fill="#92400E" />
    <circle cx="145" cy="145" r="1.5" fill="#92400E" />
    <circle cx="135" cy="143" r="1.5" fill="#92400E" />
    <circle cx="142" cy="138" r="1.5" fill="#92400E" />
    <path d="M40 120 A 10 10 0 0 0 55 110 Z" fill="#A3E635" stroke="#4ADE80" strokeWidth="2" />
  </svg>
);

const getMenuArt = (menu: Menu) => {
  const name = menu.name;
  
  if (name.includes("กะเพรา") || name.includes("ผัดพริกแกง")) return <KapraoArt />;
  if (name.includes("ส้มตำ") || name.includes("ตำ")) return <SomtumArt />;
  if (name.includes("ต้มยำ")) return <TomYumArt />;
  if (name.includes("ยำ")) return <YumArt />;
  if (name.includes("ลาบ")) return <LarbArt />;
  if (name.includes("ก๋วยเตี๋ยว") || name.includes("บะหมี่") || name.includes("มาม่า") || name.includes("เส้น") || name.includes("ราดหน้า") || name.includes("ซอย")) return <NoodleArt />;
  if (name.includes("ไข่เจียว")) return <OmeletArt />;
  if (name.includes("ข้าวต้ม") || name.includes("โจ๊ก") || name.includes("ซุป") || name.includes("ต้มจืด") || name.includes("แกงจืด")) return <PorridgeArt />;
  if (name.includes("ต้มข่า") || name.includes("มัสมั่น")) return <CurryArt />;
  if (name.includes("หมูกระทะ") || name.includes("ปิ้งย่าง")) return <MookrataArt />;
  if (name.includes("หมูแดง")) return <MooDaengArt />;
  if (name.includes("ข้าวมันไก่")) return <KhaoManGaiArt />;
  if (name.includes("ชาบู") || name.includes("สุกี้") || name.includes("จิ้มจุ่ม") || name.includes("หม้อไฟ")) return <ShabuArt />;
  if (name.includes("ผัดไทย") || name.includes("ผัดซีอิ๊ว")) return <PadThaiArt />;
  if (name.includes("ข้าวผัด")) return <FriedRiceArt />;
  if (name.includes("ขาหมู")) return <KhaoKhaMooArt />;
  if (name.includes("สลัด")) return <SaladArt />;

  switch(menu.category) {
    case "spicy": return <KapraoArt />;
    case "comfort": return <PorridgeArt />;
    case "heavy": return <MookrataArt />;
    case "light": return <SaladArt />;
    default: return <KapraoArt />;
  }
};

const getCategoryName = (category: string) => {
  const nameMap: { [key: string]: string } = {
    spicy: "อยากให้จัดเต็ด",
    comfort: "อยากให้อบอุ่น",
    heavy: "อยากให้หิวจัดหนัก",
    light: "อยากให้เบาๆ"
  };
  return nameMap[category] || "ไม่ทราบ";
};

export default function FoodQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ spicy: 0, comfort: 0, heavy: 0, light: 0 });
  const [showResult, setShowResult] = useState(false);
  const [resultMenu, setResultMenu] = useState<Menu | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (type: ScoreCategory) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: typeof scores) => {
    const topCategory = Object.keys(finalScores).reduce((a, b) => {
      const aKey = a as ScoreCategory;
      const bKey = b as ScoreCategory;
      return finalScores[aKey] > finalScores[bKey] ? aKey : bKey;
    }, "spicy" as ScoreCategory);

    const matchedMenus = menus.filter(menu => menu.category === topCategory);
    // สุ่มเมนูจากหมวดหมู่ที่ได้คะแนนสูงสุด
    const selectedMenu = matchedMenus[Math.floor(Math.random() * matchedMenus.length)];
    
    setResultMenu(selectedMenu);
    setShowResult(true);
  };

  const handleShare = async () => {
    const text = `วันนี้ฉันควรกิน: ${resultMenu?.name}\n${getCategoryName(resultMenu?.category || "")}\n\n${resultMenu?.reason}\n\nลองเล่นเกมหา: https://kinraidee.vercel.app`;
    
    try {
      if (navigator.canShare && resultRef.current) {
        const htmlToImage = await import("html-to-image");
        const blob = await htmlToImage.toBlob(resultRef.current, { pixelRatio: 2, backgroundColor: "#ffffff" });
        
        if (blob) {
          const file = new File([blob], `kinraidee-${resultMenu?.name}.png`, { type: 'image/png' });
          const shareData = { title: "วันนี้กินอะไรดี?", text: text, files: [file] };
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        }
      }
    } catch (err) {
      console.error("Image share failed, falling back to text", err);
    }

    // Fallback to text or clipboard
    if (navigator.share) {
      try {
        await navigator.share({
          title: "What Should I Eat Today?",
          text: text
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!resultRef.current) return;

    const htmlToImage = await import("html-to-image");
    const dataUrl = await htmlToImage.toPng(resultRef.current, { 
      pixelRatio: 2, 
      backgroundColor: "#ffffff" 
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `kinraidee-${resultMenu?.name}.png`;
    link.click();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ spicy: 0, comfort: 0, heavy: 0, light: 0 });
    setShowResult(false);
    setResultMenu(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {!quizStarted ? (
          /* หน้าแรก (Landing Page) */
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center border border-orange-200">
            {/* App Logo & Title */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 mb-6 drop-shadow-2xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                <AppLogo />
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-amber-500 tracking-tight pb-2">
                กินไรดี?
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
              คิดไม่ออกใช่ไหมว่ามื้อนี้จะกินอะไรดี? ตอบคำถามง่ายๆ ไม่กี่ข้อ แล้วเราจะเลือกเมนูที่ใช่ที่สุดให้กับคุณเอง!
            </p>
            
            <button
              onClick={() => setQuizStarted(true)}
              className="w-full sm:w-auto px-10 py-4 bg-orange-500 text-white text-xl font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-[0_8px_30px_rgb(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.5)] hover:-translate-y-1 active:translate-y-0"
            >
              เริ่มหาของกิน!
            </button>
          </div>
        ) : showResult && resultMenu ? (
          /* หน้าแสดงผลลัพธ์ */
          <div className="space-y-6">
            {/* ส่วนแสดงผล (จะถูก Capture เป็นการ์ด) */}
            <div ref={resultRef} className="bg-white rounded-3xl shadow-xl p-10 text-center border border-orange-200">
              {/* Header */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">ผลลัพธ์ของคุณ</p>
              </div>

              {/* Category Art */}
              <div className="mb-8 flex justify-center">
                {getMenuArt(resultMenu)}
              </div>

              {/* Menu Name - Big Title */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
                  {resultMenu.name}
                </h1>
                <div className="h-1 w-16 bg-orange-300 mx-auto rounded-full"></div>
              </div>

              {/* Reason Box */}
              <div className="bg-orange-50 p-6 rounded-2xl mb-8 border border-orange-200">
                <p className="text-gray-700 font-bold mb-3">ทำไมต้องเป็นเมนูนี้?</p>
                <p className="text-gray-600 text-base leading-relaxed">{resultMenu.reason}</p>
              </div>

              {/* Score Summary */}
              <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2"><SpicyIcon /></div>
                  <p className="text-sm font-bold text-gray-700">{scores.spicy}</p>
                  <p className="text-xs text-gray-500">Spicy</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2"><ComfortIcon /></div>
                  <p className="text-sm font-bold text-gray-700">{scores.comfort}</p>
                  <p className="text-xs text-gray-500">Comfort</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2"><HeavyIcon /></div>
                  <p className="text-sm font-bold text-gray-700">{scores.heavy}</p>
                  <p className="text-xs text-gray-500">Heavy</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2"><LightIcon /></div>
                  <p className="text-sm font-bold text-gray-700">{scores.light}</p>
                  <p className="text-xs text-gray-500">Light</p>
                </div>
              </div>

              {/* Watermark for shared image */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6">
                    <AppLogo />
                  </div>
                  <p className="text-sm font-bold text-orange-500 tracking-wide">
                    กินไรดี?
                  </p>
                </div>
                <p className="text-xs text-gray-400 font-medium">
                  kinraidee.vercel.app
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-sm"
              >
                <ShareIcon /> {copied ? 'คัดลอกลิ้งค์แล้ว!' : 'แชร์ผลลัพธ์'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-bold border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <DownloadIcon /> เซฟรูป
              </button>
              <button
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-500 font-bold border-2 border-orange-200 rounded-xl hover:bg-orange-50 transition-all shadow-sm"
              >
                <RefreshIcon /> เล่นอีกครั้ง
              </button>
            </div>
          </div>
        ) : (
          /* หน้าควิซคำถาม */
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-orange-200">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                วันนี้กินอะไรดี?
              </h1>
              <p className="text-gray-500 font-medium">ตอบคำถาม 10 ข้อ และเราจะบอกว่าคุณควรกินอะไร!</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-600">ความก้าวหน้า</span>
                <span className="text-sm font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight">
                {questions[currentQuestion].question}
              </h2>

              {/* Answer Buttons */}
              <div className="space-y-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer.type as ScoreCategory)}
                    className="w-full p-4 md:p-5 border-2 border-gray-200 rounded-2xl text-left hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 font-medium text-gray-700 group hover:scale-105 transform"
                  >
                    <span className="group-hover:text-orange-600 transition">
                      {answer.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
