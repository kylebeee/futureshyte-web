"use client";

import { useCompletion } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const responseRef = useRef<HTMLDivElement>(null);
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/divine",
    streamProtocol: "text",
  });

  // Auto-scroll as text streams in
  useEffect(() => {
    if (completion && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [completion]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    await complete(question, { body: { question } });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden">
      {/* Background orb effect */}
      <div className="fixed inset-0 orb-bg" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-3xl" />

      {/* Scrollable content area */}
      <main className="relative z-10 flex flex-col items-center gap-8 px-6 pt-16 pb-48 max-w-2xl w-full mx-auto flex-1">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-6xl animate-float select-none">🔮</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center shimmer-text">
            FutureShyte
          </h1>
          <p className="text-purple-300/70 text-sm font-mono tracking-widest uppercase">
            Divination-as-a-Service
          </p>
        </div>

        {/* Tagline */}
        <p className="text-center text-purple-200/50 max-w-md text-sm leading-relaxed">
          The world&apos;s first AI that can actually see the future.
          Powered by the Cosmic API&trade; and an unreasonable amount of
          confidence.
        </p>

        {/* Crystal Ball / Response Area */}
        <div
          ref={responseRef}
          className={`w-full min-h-[160px] rounded-2xl border border-purple-500/20 bg-purple-950/20 backdrop-blur-sm p-6 flex items-center justify-center transition-all duration-500 ${
            isLoading ? "animate-pulse-glow" : ""
          }`}
        >
          {isLoading && !completion ? (
            <p className="text-purple-300/60 italic font-mono text-sm">
              ✦ Consulting the eternal codebase... ✦
            </p>
          ) : completion ? (
            <p className="text-purple-100 text-lg leading-relaxed text-center font-serif italic">
              &ldquo;{completion}&rdquo;
            </p>
          ) : (
            <p className="text-purple-400/40 text-sm text-center">
              The void awaits your question...
            </p>
          )}
        </div>

        {/* Disclaimer */}
        {completion && !isLoading && (
          <p className="text-purple-500/30 text-xs text-center max-w-sm">
            FutureShyte&trade; predictions are 100% accurate in at least one
            parallel universe. Not financial advice. Not any kind of advice.
            The oracle accepts no liability for futures both seen and unseen.
          </p>
        )}

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-1 text-purple-500/30 text-xs">
          <p>
            &copy; 2026 FutureShyte Labs&trade; &middot; A Division of
            Absolutely Nothing Inc.
          </p>
          <p className="font-mono">v0.0.1-alpha-beta-gamma-vibes</p>
        </footer>
      </main>

      {/* Fixed input at bottom — keyboard-avoiding via env(safe-area-inset-bottom) */}
      <div className="fixed bottom-0 inset-x-0 z-20 bg-[#0a0a12]/90 backdrop-blur-md border-t border-purple-500/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <form
          onSubmit={onSubmit}
          className="flex gap-2 px-4 py-3 max-w-2xl mx-auto"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask the oracle anything..."
            className="flex-1 rounded-xl border border-purple-500/30 bg-purple-950/30 px-4 py-3 text-purple-100 placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="rounded-xl bg-purple-600/80 hover:bg-purple-600 disabled:opacity-40 disabled:hover:bg-purple-600/80 px-5 py-3 text-sm font-medium text-white transition-all cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? "Divining..." : "Divine"}
          </button>
        </form>
      </div>
    </div>
  );
}
