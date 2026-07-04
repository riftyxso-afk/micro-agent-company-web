"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Server, CheckCircle, ArrowRight, Bot, Loader } from "lucide-react";

const steps = [
  { id: "vps", label: "Menyiapkan VPS Server" },
  { id: "openclaw", label: "Menginstall OpenClaw" },
  { id: "config", label: "Konfigurasi Agent" },
  { id: "gateway", label: "Mengaktifkan Gateway" },
  { id: "done", label: "Siap!" },
];

function ProvisioningContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("order_id") || "";
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        setCurrentStep(i);
        const delay = i === steps.length - 1 ? 1500 : 2000 + Math.random() * 1500;
        await new Promise((r) => setTimeout(r, delay));
      }
      if (!cancelled) {
        setCurrentStep(steps.length - 1);
        setDone(true);
      }
    }

    run();

    return () => { cancelled = true; };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-8">
      <div className="w-full max-w-lg">
        <div className="rounded-[12px] border border-black/5 bg-white p-8 text-center shadow-sm sm:p-12">
          {!done ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <div className="relative">
                  <div className="h-16 w-16 animate-spin rounded-full border-[3px] border-stone-100 border-t-[#1a1a1a]" />
                  <Server className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[#1a1a1a]" />
                </div>
              </div>

              <h1 className="mt-6 text-xl font-medium tracking-[-0.02em]">
                {steps[currentStep]?.label || "Memproses..."}
              </h1>
              <p className="mt-2 text-sm text-[#1a1a1a]/60">
                Kami sedang menyiapkan VPS & AI Assistant kamu. Ini hanya butuh beberapa detik.
              </p>

              <div className="mt-8 space-y-3 text-left">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-all ${
                        i < currentStep
                          ? "bg-green-100 text-green-700"
                          : i === currentStep
                            ? "bg-[#1a1a1a] text-white"
                            : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      {i < currentStep ? <CheckCircle size={14} /> : i === currentStep ? <Loader size={12} className="animate-spin" /> : i + 1}
                    </div>
                    <span
                      className={`text-sm transition ${
                        i <= currentStep ? "text-[#1a1a1a] font-medium" : "text-[#1a1a1a]/40"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {orderId && (
                <p className="mt-6 text-xs text-[#1a1a1a]/30">
                  Order ID: {orderId}
                </p>
              )}
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h1 className="mt-6 text-xl font-medium tracking-[-0.02em]">
                VPS & AI Assistant Siap! 🎉
              </h1>
              <p className="mt-2 text-sm text-[#1a1a1a]/60">
                MicroClaw kamu sudah aktif. Saatnya connect Telegram dan mulai chat dengan agent.
              </p>

              <button
                onClick={() => router.push("/dashboard/microclaw")}
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-sm text-white transition hover:bg-[#0000EE]"
              >
                Buka Dashboard <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ProvisioningPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-stone-100 border-t-[#1a1a1a]" />
          </div>
        </main>
      }
    >
      <ProvisioningContent />
    </Suspense>
  );
}
