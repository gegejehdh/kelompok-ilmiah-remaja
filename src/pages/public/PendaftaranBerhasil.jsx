import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home } from "lucide-react";

import {
  LOGO_URL,
  NAMA_ORGANISASI,
  NAMA_SEKOLAH,
} from "@/lib/kir-constants";

import { Image } from "@/components/ui/image";

export default function PendaftaranBerhasil() {
  const navigate = useNavigate();

  return (
    <div className="hero-gradient relative flex min-h-screen items-center justify-center px-4 py-16">
      {/* Dekorasi Background */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-kir-yellow/20 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-lg animate-pop-in rounded-3xl bg-white p-8 text-center shadow-card sm:p-10">

        {/* Logo */}
        <div className="mx-auto mb-6 h-24 w-24">
          <Image
            src={LOGO_URL}
            alt="Logo KIR SMANCA"
            fittingType="contain"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Icon Berhasil */}
        <div className="mx-auto mb-5 inline-flex h-20 w-20 animate-pop-in items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        {/* Judul */}
        <h1 className="font-heading text-2xl font-extrabold text-kir-blue-dark sm:text-3xl">
          PENDAFTARAN BERHASIL!
        </h1>

        {/* Pesan */}
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Terima kasih telah mendaftarkan diri sebagai calon anggota{" "}
          {NAMA_ORGANISASI}.
        </p>

        <p className="mt-2 leading-relaxed text-muted-foreground">
          Data pendaftaran Anda telah berhasil dikirim dan disimpan.
        </p>

        <p className="mt-2 font-semibold text-kir-blue">
          Sampai bertemu di keluarga besar KIR SMANCA! 🎉
        </p>

        {/* Tombol */}
        <button
          type="button"
          onClick={() => navigate
