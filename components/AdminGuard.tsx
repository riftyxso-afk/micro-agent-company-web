"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";

const STORAGE_KEY = "tmc_admin_auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem(STORAGE_KEY, "true");
        setAuthed(true);
      } else {
        setError("Password salah.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-stone-300" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="w-full max-w-[380px] bg-white border border-stone-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-5">
            <Lock size={20} className="text-stone-500" />
          </div>
          <h1 className="font-serif text-xl font-normal mb-1">Admin Access</h1>
          <p className="text-stone-500 text-[13px] mb-6">Masukkan password admin</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none text-center"
            />
            {error && <p className="text-[12px] text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[13px] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-stone-900/5 backdrop-blur-sm border-b border-transparent pointer-events-none" />
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={logout}
          className="bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-400 hover:text-red-500 text-[10px] font-medium px-2.5 py-1 rounded-lg hover:bg-white transition-all cursor-pointer pointer-events-auto"
        >
          Logout
        </button>
      </div>
      {children}
    </>
  );
}
