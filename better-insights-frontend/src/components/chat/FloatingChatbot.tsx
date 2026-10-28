"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageSquare, X, Send, Sparkles, Loader2, Bot, ArrowRight, ExternalLink } from "lucide-react";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
  time: string;
  suggestions?: string[];
  action?: {
    type: "modal" | "link";
    label: string;
    target: string;
  };
}

const INITIAL_MESSAGE: Message = {
  id: "msg-1",
  role: "assistant",
  text: "Hello! Welcome to Better Insights. How can we help you accelerate your digital growth, engineering, or marketing strategy today?",
  time: "Just now",
  suggestions: [
    "Get Marketing Plan",
    "Website Development",
    "SEO & Paid Ads",
    "CRM & AI Automation",
    "Explore Our Work",
  ],
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle keyboard Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        throw new Error("Unable to reach assistant service");
      }

      const data = await res.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        text: data.reply || "Thank you for reaching out. Our team is ready to discuss your business goals.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: data.suggestions,
        action: data.action,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot-err-${Date.now()}`,
        role: "assistant",
        text: "We're currently assisting other clients. You can request a free customized Marketing Plan or speak directly with our team at +91 950 999 6730.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: {
          type: "modal",
          label: "Get Marketing Plan",
          target: "bi:open-lead-modal",
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action: NonNullable<Message["action"]>) => {
    if (action.type === "modal") {
      openMarketingPlanModal();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button on Bottom-Right */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[990]">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#582AD9] to-[#6C3CFF] text-white shadow-[0_8px_24px_-2px_rgba(108,60,255,0.45)] hover:shadow-[0_12px_32px_-2px_rgba(108,60,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#6C3CFF] focus-visible:outline-offset-4"
          aria-label={isOpen ? "Close AI Assistant" : "Open Better Insights AI Assistant"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
              {/* Online pulsing indicator */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#33CC7A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#33CC7A] border-2 border-white"></span>
              </span>
            </>
          )}

          {/* Desktop Hover Tooltip */}
          {!isOpen && (
            <span className="hidden sm:block absolute right-16 px-3 py-1.5 rounded-full bg-[#1B1411] text-white text-xs font-medium whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              Chat with Better Insights
            </span>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Better Insights Virtual Assistant"
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[540px] max-h-[calc(100vh-7rem)] bg-white rounded-2xl shadow-[0_20px_50px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.08)] flex flex-col z-[995] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-[#181324] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6C3CFF] to-[#A855F7] flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm leading-tight text-white">Better Insights AI</h3>
                  <Sparkles className="w-3.5 h-3.5 text-[#33CC7A]" />
                </div>
                <p className="text-[11px] text-white/60 leading-tight flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A] inline-block"></span>
                  Online · Strategy Assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8F5]/50">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%] ${
                    isUser ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#6C3CFF] text-white rounded-br-xs"
                        : "bg-white text-[#1B1411] border border-black/8 shadow-xs rounded-bl-xs"
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Action Link/Button */}
                  {m.action && (
                    <div className="mt-2">
                      {m.action.type === "modal" ? (
                        <button
                          type="button"
                          onClick={() => handleActionClick(m.action!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B1411] hover:bg-[#6C3CFF] text-white text-xs font-medium transition-colors shadow-xs"
                        >
                          <span>{m.action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <Link
                          href={m.action.target}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B1411] hover:bg-[#6C3CFF] text-white text-xs font-medium transition-colors shadow-xs"
                        >
                          <span>{m.action.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Suggestions Chips */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {m.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#6C3CFF]/10 hover:text-[#6C3CFF] border border-black/10 text-[11px] font-medium text-[#1B1411]/80 transition-colors"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-[#1B1411]/40 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-black/8 shadow-xs w-20">
                <span className="w-2 h-2 rounded-full bg-[#6C3CFF] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#6C3CFF] animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#6C3CFF] animate-bounce [animation-delay:0.3s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-black/8 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about marketing, SEO, or web dev..."
              disabled={loading}
              className="flex-1 bg-[#FAF5F0] border border-black/10 rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#1B1411] placeholder:text-[#1B1411]/45 focus:outline-none focus:border-[#6C3CFF] focus:ring-1 focus:ring-[#6C3CFF] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full bg-[#6C3CFF] hover:bg-[#582AD9] disabled:opacity-40 disabled:hover:bg-[#6C3CFF] text-white flex items-center justify-center transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-[#6C3CFF]"
              aria-label="Send message"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
