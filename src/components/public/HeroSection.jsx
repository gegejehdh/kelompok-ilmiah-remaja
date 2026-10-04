import React from "react";
import { useNavigate } from "react-router-dom";
import { Flame, CalendarDays, ArrowRight } from "lucide-react";
import {
  LOGO_URL,
  DOKUMENTASI_FOTO,
  NAMA_SEKOLAH,
} from "@/lib/kir-constants";
import { Image } from "@/components/ui/image";

export default function HeroSection({ pengaturan }) {
  const navigate = useNavigate();

  const heroText =
    pengaturan?.deskripsi_hero ||
    "Selamat datang di website resmi Kelompok Ilmiah Remaja (KIR) SMANCA. Bergabunglah bersama kami untuk mengembangkan kreativitas, kemampuan berpikir kritis, keterampilan penelitian, serta semangat berinovasi dalam dunia ilmu pengetahuan.";

  return (
    <section
      id="beranda"
      className="relative overflow-hidden hero-gradient"
    >
      {/* Dekorasi */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-kir-yellow/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Teks */}
          <div className="animate-fade-in text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kir-yellow backdrop-blur">
              <Flame className="h-4 w-4" />
              Pendaftaran Anggota Baru
            </span>

            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              KELOMPOK ILMIAH REMAJA
            </h1>

            <p className="mt-1 font-heading text-xl font-bold text-kir-yellow sm:text-2xl">
              {NAMA_SEKOLAH}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {heroText}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/pendaftaran")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-kir-red shadow-card transition-transform hover:-translate-y-0.5"
              >
                <Flame className="h-5 w-5 text-kir-yellow" />
                Daftar Sekarang
              </button>

              <button
                onClick={() => navigate("/#kegiatan")}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                <CalendarDays className="h-5 w-5" />
                Jelajahi Kegiatan
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-pop-in">
            <div className="relative overflow-hidden rounded-3xl shadow-card ring-4 ring-white/20">
              <Image
                src={DOKUMENTASI_FOTO[1].url}
                alt="Kegiatan KIR SMANCA"
                fittingType="fill"
                className="h-72 w-full object-cover sm:h-96"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-kir-blue-dark/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2 shadow-card sm:h-28 sm:w-28">
              <Image
                src={LOGO_URL}
                alt="Logo KIR SMANCA"
                fittingType="contain"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
