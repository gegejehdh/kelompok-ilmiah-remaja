import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Flame } from "lucide-react";

import {
  LOGO_URL,
  NAMA_ORGANISASI,
} from "@/lib/kir-constants";

import { Image } from "@/components/ui/image";

// ==========================================
// NAVIGATION ITEMS
// ==========================================

const NAV_ITEMS = [
  {
    label: "Beranda",
    to: "/",
  },
  {
    label: "Profil KIR",
    to: "/#profil",
  },
  {
    label: "Kegiatan",
    to: "/#kegiatan",
  },
  {
    label: "Dokumentasi",
    to: "/#dokumentasi",
  },
  {
    label: "Pendaftaran",
    to: "/pendaftaran",
  },
  {
    label: "Kontak",
    to: "/#kontak",
  },
];

// ==========================================
// PUBLIC NAVBAR
// ==========================================

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // ========================================
  // HANDLE NAVIGATION
  // ========================================

  const handleNav = (to) => {
    setMobileOpen(false);
    navigate(to);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">

          {/* ================================= */}
          {/* LOGO + NAMA ORGANISASI */}
          {/* ================================= */}

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="h-11 w-11 shrink-0 sm:h-12 sm:w-12">
              <Image
                src={LOGO_URL}
                alt="Logo KIR SMANCA"
                fittingType="contain"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="leading-tight">
              <span className="block font-heading text-base font-extrabold tracking-tight text-kir-blue-dark sm:text-lg">
                {NAMA_ORGANISASI}
              </span>

              <span className="block text-[10px] font-medium text-muted-foreground sm:text-xs">
                UPTD SMAN 1 Campalagian
              </span>
            </div>
          </Link>

          {/* ================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================= */}

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.to)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-kir-blue-dark transition-colors hover:bg-kir-cream/60 hover:text-kir-red"
              >
                {item.label}
              </button>
            ))}

            {/* Tombol Daftar */}
            <button
              type="button"
              onClick={() =>
                handleNav("/pendaftaran")
              }
              className="btn-kir-gradient ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Flame className="h-4 w-4 text-kir-yellow" />
              Daftar Sekarang
            </button>
          </nav>

          {/* ================================= */}
          {/* MOBILE HAMBURGER */}
          {/* ================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-kir-blue-dark transition-colors hover:bg-kir-cream/60 lg:hidden"
            aria-label={
