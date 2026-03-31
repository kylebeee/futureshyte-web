"use client";

import { useCompletion } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

export default function Home() {
  const [question, setQuestion] = useState("");
  const responseEndRef = useRef<HTMLDivElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/divine",
    streamProtocol: "text",
  });

  // Auto-scroll as text streams in, accounting for fixed input height
  useEffect(() => {
    if (!completion || !responseEndRef.current) return;
    const inputHeight = inputBarRef.current?.offsetHeight ?? 120;
    const el = responseEndRef.current;
    const rect = el.getBoundingClientRect();
    const visibleBottom = window.innerHeight - inputHeight;

    if (rect.bottom > visibleBottom) {
      window.scrollBy({
        top: rect.bottom - visibleBottom + 16,
        behavior: "smooth",
      });
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
      <main className="relative z-10 flex flex-col items-center gap-8 px-6 pt-16 pb-44 max-w-2xl w-full mx-auto flex-1">
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
            <div className="text-purple-100 text-lg leading-relaxed text-center font-serif italic prose prose-invert prose-purple max-w-none prose-p:my-1 prose-strong:text-purple-200 prose-em:text-purple-200 prose-code:text-purple-300 prose-code:bg-purple-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
              <Markdown>{completion}</Markdown>
            </div>
          ) : (
            <p className="text-purple-400/40 text-sm text-center">
              The void awaits your question...
            </p>
          )}
        </div>
        {/* Scroll anchor — sits after response content */}
        <div ref={responseEndRef} />

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

      {/* Fixed input at bottom */}
      <div
        ref={inputBarRef}
        className="fixed bottom-0 inset-x-0 z-20 px-4 pb-4"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)" }}
      >
        <form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto rounded-2xl border border-purple-500/25 overflow-hidden"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (question.trim() && !isLoading) {
                  onSubmit(e);
                }
              }
            }}
            placeholder="Ask the oracle anything..."
            rows={1}
            className="w-full bg-transparent px-4 pt-3 pb-0 text-purple-100 placeholder:text-purple-400/40 focus:outline-none resize-none font-mono text-base"
            disabled={isLoading}
          />
          <div className="flex items-center justify-end px-3 py-2">
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:hover:bg-purple-600 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={isLoading ? "animate-pulse" : ""}
              >
                <path
                  d="M8 12V4M8 4L4 8M8 4L12 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
