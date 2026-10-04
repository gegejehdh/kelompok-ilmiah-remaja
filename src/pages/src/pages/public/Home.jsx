import React, { useEffect, useState } from "react";

import { base44 } from "@/api/base44Client";

import {
  getSingleRecord,
  DEFAULT_PENGATURAN,
} from "@/lib/kir-constants";

import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import HeroSection from "@/components/public/HeroSection";
import ProfilSection from "@/components/public/ProfilSection";
import KegiatanSection from "@/components/public/KegiatanSection";
import DokumentasiSection from "@/components/public/DokumentasiSection";
import KontakSection from "@/components/public/KontakSection";

export default function Home() {
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getSingleRecord(
      base44.entities.PengaturanWebsite,
      DEFAULT_PENGATURAN
    ).then((p) => {
      setPengaturan(
        p._missing
          ? DEFAULT_PENGATURAN
          : p
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <main>
        <HeroSection pengaturan={pengaturan} />

        <ProfilSection />

        <KegiatanSection />

        <DokumentasiSection />

        <KontakSection
          pengaturan={pengaturan}
        />
      </main>

      <PublicFooter
        footerText={pengaturan?.footer_text}
      />
    </div>
  );
}
