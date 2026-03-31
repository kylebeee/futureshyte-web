"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/divine",
    streamProtocol: "text",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await complete(question, { body: { question } });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background orb effect */}
      <div className="absolute inset-0 orb-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-3xl" />

      <main className="relative z-10 flex flex-col items-center gap-8 px-6 py-16 max-w-2xl w-full">
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

        {/* Input Area */}
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask the oracle anything..."
            className="w-full rounded-xl border border-purple-500/30 bg-purple-950/30 px-4 py-3 text-purple-100 placeholder:text-purple-400/40 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-purple-600/80 hover:bg-purple-600 disabled:opacity-40 disabled:hover:bg-purple-600/80 px-4 py-3 text-sm font-medium text-white transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? "Divining..." : "Ask the Oracle"}
          </button>
        </form>

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
    </div>
  );
}
