"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { SocketProvider } from "@/context/SocketContext";
import useAuth from "@/hooks/useAuth";

export default function MainLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #e0e7ff",
              borderTop: "4px solid #4f46e5",
              borderRadius: "9999px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Loading FitSync...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex max-w-7xl mx-auto">
          <Sidebar />
          <main className="flex-1 px-4 sm:px-6 py-6 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}