import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";

// ==========================================
// HALAMAN PUBLIK
// ==========================================

import Home from "@/pages/public/Home";
import Pendaftaran from "@/pages/public/Pendaftaran";
import PendaftaranBerhasil from "@/pages/public/PendaftaranBerhasil";

// ==========================================
// HALAMAN ADMIN
// ==========================================

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPendaftar from "@/pages/admin/AdminPendaftar";
import AdminPendaftarDetail from "@/pages/admin/AdminPendaftarDetail";
import AdminKegiatan from "@/pages/admin/AdminKegiatan";
import AdminDokumentasi from "@/pages/admin/AdminDokumentasi";
import AdminProfil from "@/pages/admin/AdminProfil";
import AdminInformasi from "@/pages/admin/AdminInformasi";
import AdminPengaturan from "@/pages/admin/AdminPengaturan";

// ==========================================
// HALAMAN AUTH BOILERPLATE
// ==========================================

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

// ==========================================
// AUTHENTICATED APP
// ==========================================

const AuthenticatedApp = () => {
  const {
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    navigateToLogin,
  } = useAuth();

  // Loading
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  // Authentication Error
  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    }

    if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* ================================== */}
      {/* WEBSITE PUBLIK */}
      {/* ================================== */}

      <Route path="/" element={<Home />} />

      <Route path="/pendaftaran" element={<Pendaftaran />} />

      <Route
        path="/pendaftaran-berhasil"
        element={<PendaftaranBerhasil />}
      />

      {/* ================================== */}
      {/* AUTH BOILERPLATE */}
      {/* ================================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* ================================== */}
      {/* ADMIN LOGIN */}
      {/* ================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ================================== */}
      {/* ADMIN DASHBOARD (PROTECTED) */}
      {/* ================================== */}

      <Route
        element={
          <ProtectedRoute
            unauthenticatedElement={
              <Navigate to="/admin/login" replace />
            }
          />
        }
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route
            path="pendaftar"
            element={<AdminPendaftar />}
          />

          <Route
            path="pendaftar/:id"
            element={<AdminPendaftarDetail />}
          />

          <Route
            path="kegiatan"
            element={<AdminKegiatan />}
          />

          <Route
            path="dokumentasi"
            element={<AdminDokumentasi />}
          />

          <Route
            path="profil"
            element={<AdminProfil />}
          />

          <Route
            path="informasi"
            element={<AdminInformasi />}
          />

          <Route
            path="pengaturan"
            element={<AdminPengaturan />}
          />
        </Route>
      </Route>

      {/* ================================== */}
      {/* HALAMAN TIDAK DITEMUKAN */}
      {/* ================================== */}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

// ==========================================
// MAIN APP
// ==========================================

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>

        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
