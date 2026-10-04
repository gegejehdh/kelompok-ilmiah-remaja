import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin } from "lucide-react";
import {
  LOGO_URL,
  NAMA_ORGANISASI,
  NAMA_SEKOLAH,
  INSTAGRAM_URL,
} from "@/lib/kir-constants";
import { Image } from "@/components/ui/image";

const QUICK_LINKS = [
  { label: "Beranda", to: "/" },
  { label: "Profil KIR", to: "/#profil" },
  { label: "Kegiatan", to: "/#kegiatan" },
  { label: "Dokumentasi", to: "/#dokumentasi" },
  { label: "Pendaftaran", to: "/pendaftaran" },
  { label: "Kontak", to: "/#kontak" },
];

export default function PublicFooter({ footerText }) {
  const copyright =
    footerText ||
    "© 2026 KIR SMANCA | UPTD SMAN 1 Campalagian — All Rights Reserved.";

  return (
