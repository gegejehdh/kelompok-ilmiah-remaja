import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Loader2,
  Send,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";

import {
  KELAS_OPTIONS,
  LOGO_URL,
  NAMA_ORGANISASI,
  NAMA_SEKOLAH,
} from "@/lib/kir-constants";

import { Image } from "@/components/ui/image";

// ==========================================
// INITIAL FORM
// ==========================================

const INITIAL = {
  nama: "",
  kelas: "",
  alamat: "",
  nomor_telepon: "",
  alasan: "",
  pesan_tambahan: "",
};

// ==========================================
// PENDAFTARAN
// ==========================================

export default function Pendaftaran() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // ========================================
  // VALIDASI FORM
  // ========================================

  const validate = () => {
    const e = {};

    if (
      !form.nama.trim() ||
      form.nama.trim().length < 2
    ) {
      e.nama = "Nama lengkap wajib diisi.";
    }

    if (!form.kelas) {
      e.kelas = "Pilih kelas Anda.";
    }

    if (!form.alamat.trim()) {
      e.alamat = "Alamat wajib diisi.";
    }

    if (!form.nomor_telepon.trim()) {
      e.nomor_telepon =
        "Nomor telepon wajib diisi.";
    } else if (
      !/^[0-9]{8,15}$/.test(
        form.nomor_telepon.trim()
      )
    ) {
      e.nomor_telepon =
        "Nomor telepon harus 8–15 digit angka.";
    }

    if (
      !form.alasan.trim() ||
      form.alasan.trim().length < 10
    ) {
      e.alasan =
        "Tuliskan alasan masuk organisasi (min. 10 karakter).";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // ========================================
  // HANDLE PERUBAHAN INPUT
  // ========================================

  const handleChange = (field, value) => {
    setForm((f) => ({
      ...f,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((er) => ({
        ...er,
        [field]: undefined,
      }));
    }
  };

  // ========================================
  // HANDLE NOMOR TELEPON
  // ========================================

  const handlePhone = (e) => {
    const digits = e.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, 15);

    handleChange(
      "nomor_telepon",
      digits
    );
  };

  // ========================================
  // SUBMIT PENDAFTARAN
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    // Cegah pengiriman ganda
    if (submitting) return;

    if (!validate()) return;

    setSubmitting(true);

    try {
      await base44.entities.Pendaftar.create({
        nama: form.nama.trim(),
        kelas: form.kelas,
        alamat: form.alamat.trim(),
        nomor_telepon:
          form.nomor_telepon.trim(),
        alasan: form.alasan.trim(),
        pesan_tambahan:
          form.pesan_tambahan.trim() ||
          undefined,
      });

      // Berhasil jika data benar-benar tersimpan
      navigate("/pendaftaran-berhasil");
    } catch (err) {
      setServerError(
        err?.message ||
          "Terjadi kesalahan saat mengirim data. Silakan coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">

        {/* Kembali */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-kir-blue hover:text-kir-red"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-20 w-20">
            <Image
              src={LOGO_URL}
              alt="Logo KIR SMANCA"
              fittingType="contain"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="font-heading text-2xl font-extrabold text-kir-blue-dark sm:text-3xl">
            Pendaftaran Anggota Baru
          </h1>

          <p className="mt-2 text-muted-foreground">
            {NAMA_ORGANISASI} — {NAMA_SEKOLAH}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8"
        >
          {/* Server Error */}
          {serverError && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <span>{serverError}</span>
            </div>
          )}

          {/* A. Nama Lengkap */}
          <div className="space-y-2">
            <Label
              htmlFor="nama"
              className="text-sm font-semibold"
            >
              A. Nama Lengkap{" "}
              <span className="text-kir-red">*</span>
            </Label>

            <Input
              id="nama"
              value={form.nama}
              maxLength={100}
              onChange={(e) =>
                handleChange(
                  "nama",
                  e.target.value
                )
              }
              placeholder="Masukkan nama lengkap"
              className="h-12"
            />

            {errors.nama && (
              <p className="text-xs text-destructive">
                {errors.nama}
              </p>
            )}
          </div>

          {/* B. Kelas */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              B. Kelas{" "}
              <span className="text-kir-red">*</span>
            </Label>

            <Select
              value={form.kelas}
              onValueChange={(value) =>
                handleChange("kelas", value)
              }
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Pilih kelas Anda" />
              </SelectTrigger>

              <SelectContent className="max-h-72">
                {KELAS_OPTIONS.map((k) => (
                  <SelectItem
                    key={k}
                    value={k}
                  >
                    {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.kelas && (
              <p className="text-xs text-destructive">
                {errors.kelas}
              </p>
            )}
          </div>

          {/* C. Alamat */}
          <div className="space-y-2">
            <Label
              htmlFor="alamat"
              className="text-sm font-semibold"
            >
              C. Alamat{" "}
              <span className="text-kir-red">*</span>
            </Label>

            <Textarea
              id="alamat"
              value={form.alamat}
              maxLength={300}
              onChange={(e) =>
                handleChange(
                  "alamat",
                  e.target.value
                )
              }
              placeholder="Masukkan alamat lengkap"
              rows={3}
            />

            {errors.alamat && (
              <p className="text-xs text-destructive">
                {errors.alamat}
              </p>
            )}
          </div>

          {/* D. Nomor Telepon */}
          <div className="space-y-2">
            <Label
              htmlFor="telepon"
              className="text-sm font-semibold"
            >
              D. Nomor Telepon Aktif{" "}
              <span className="text-kir-red">*</span>
            </Label>

            <Input
              id="telepon"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.nomor_telepon}
              onChange={handlePhone}
              placeholder="08xxxxxxxxxx"
              className="h-12"
            />

            {errors.nomor_telepon && (
              <p className="text-xs text-destructive">
                {errors.nomor_telepon}
              </p>
            )}
          </div>

          {/* E. Alasan */}
          <div className="space-y-2">
            <Label
              htmlFor="alasan"
              className="text-sm font-semibold"
            >
              E. Alasan Masuk Organisasi{" "}
              <span className="text-kir-red">*</span>
            </Label>

            <Textarea
              id="alasan"
              value={form.alasan}
              maxLength={500}
              onChange={(e) =>
                handleChange(
                  "alasan",
                  e.target.value
                )
              }
              placeholder="Mengapa Anda ingin bergabung dengan KIR SMANCA?"
              rows={4}
            />

            {errors.alasan && (
              <p className="text-xs text-destructive">
                {errors.alasan}
              </p>
            )}
          </div>

          {/* F. Pesan Tambahan */}
          <div className="space-y-2">
            <Label
              htmlFor="pesan"
              className="text-sm font-semibold"
            >
              F. Pesan Tambahan{" "}
              <span className="font-normal text-muted-foreground">
                (opsional)
              </span>
            </Label>

            <Textarea
              id="pesan"
              value={form.pesan_tambahan}
              maxLength={500}
              onChange={(e) =>
                handleChange(
                  "pesan_tambahan",
                  e.target.value
                )
              }
              placeholder="Tuliskan pesan tambahan jika ada"
              rows={3}
            />
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="btn-kir-gradient h-12 w-full text-base font-bold text-white shadow-card hover:opacity-95"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Mengirim data...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Kirim Pendaftaran
              </>
            )}
          </Button>
        </form>
      </main>

      <PublicFooter />
    </div>
  );
          }
