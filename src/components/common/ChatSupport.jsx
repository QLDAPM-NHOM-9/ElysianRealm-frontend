import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMessageCircle, FiX, FiSend, FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


import { chatWithAI } from "../../services/aiClient";
// (Step 7) If you created this client, keep the import; otherwise you can comment it out.
// import { fetchTourById } from "../../services/bookingBackendClient";

const makeStorageKey = (tourId) =>
  `elysian_ai_chat:${tourId ? `tour:${tourId}` : "global"}`;

const safeJsonParse = (raw, fallback) => {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const ChatSupport = () => {
  // ===== 1) Read tourId from URL query (?tourId=1) =====
  const location = useLocation();

  const tourId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const v = params.get("tourId");
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : v; // support numeric or string ids
  }, [location.search]);

  const STORAGE_KEY = useMemo(() => makeStorageKey(tourId), [tourId]);

  // ===== 2) UI state =====
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  // ===== 3) (Step 7) Tour data state (BE) =====
  const [tourData, setTourData] = useState(null);
  const [tourLoadError, setTourLoadError] = useState("");

  // ===== 4) Messages state (load from storage once) =====
  const [messages, setMessages] = useState(() => {
    const initial = [
      {
        role: "assistant",
        content:
          "Xin chào! Tôi là trợ lý AI của Elysian Realm. Tôi có thể gợi ý lịch trình, tư vấn tour và trả lời câu hỏi du lịch. Bạn cần giúp gì hôm nay?",
      },
    ];

    // First load from GLOBAL storage (works even before tourId exists)
    const raw = localStorage.getItem(makeStorageKey(null));
    if (!raw) return initial;

    const parsed = safeJsonParse(raw, initial);
    return Array.isArray(parsed) && parsed.length ? parsed : initial;
  });

  const tourContext = useMemo(() => {
    if (!tourData) return null;

    // Map gently to avoid strict field dependencies on BE
    return {
      id: tourId,
      title: tourData?.title || tourData?.name || tourData?.tourName,
      location: tourData?.location || tourData?.destination,
      price: tourData?.price || tourData?.adultPrice,
      duration: tourData?.duration || tourData?.days,
      highlights: tourData?.highlights || tourData?.tags || tourData?.features,
      description: tourData?.description,
    };
  }, [tourData, tourId]);
  // ===== 6) Scroll handling =====
  const endRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  // ===== 7) Toggle =====
  const toggleChat = () => setIsOpen((v) => !v);

  // ===== 8) Persist chat history per STORAGE_KEY =====
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (_) {}
  }, [messages, STORAGE_KEY]);

  // ===== 9) Auto-scroll when open / messages change =====
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => scrollToBottom("smooth"), 0);
    return () => clearTimeout(t);
  }, [isOpen, messages, isTyping]);

  // ===== 10) Load history per tour when tourId changes (recommended) =====
  useEffect(() => {
    if (!isOpen) return;

    const initial = [
      {
        role: "assistant",
        content: "Xin chào! Bạn cần mình hỗ trợ gì về chuyến đi/tour này?",
      },
    ];

    try {
      const raw = localStorage.getItem(makeStorageKey(tourId));
      if (!raw) return;

      const parsed = safeJsonParse(raw, initial);
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId, isOpen]);

  // ===== 12) Clear chat =====
  const clearChat = () => {
    const initial = [
      {
        role: "assistant",
        content: "Đã xóa lịch sử chat ✅ Bạn muốn mình hỗ trợ gì tiếp theo?",
      },
    ];

    setMessages(initial);
    setError("");
    setInput("");
    setIsTyping(false);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch (_) {}
  };

  // ===== 13) Send message =====
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setError("");
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    scrollToBottom("auto");

    setIsTyping(true);
    try {
      const data = await chatWithAI({
        message: text,
        tourId,
        context: tourContext, // may be null
      });

      const reply = data?.reply || "(AI không trả lời được 😅)";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(e?.message || "Unknown error");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Mình gặp lỗi khi gọi AI-service. Bạn kiểm tra ai-service đang chạy ở port 3001 nhé.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={toggleChat}
            className="bg-brand-primary hover:bg-brand-secondary text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
            aria-label="Open chat support"
          >
            <FiMessageCircle size={24} />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-brand-primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold">Elysia AI</h3>
                  <p className="text-xs opacity-90">
                    {isTyping ? (
                      "Đang trả lời..."
                    ) : (
                      
                        "Gợi ý tour – Lên lịch trình – Tư vấn nhanh"
                    )}  

                  </p>
                  {tourId ? (
                    <p className="text-[10px] opacity-80">TourId: {String(tourId)}</p>
                  ) : (
                    <p className="text-[10px] opacity-80">TourId: (global)</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <FiTrash2 size={18} />
                </button>

                <button
                  onClick={toggleChat}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {messages.map((m, idx) => (
                  <MessageBubble key={idx} role={m.role} content={m.content} />
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white font-bold">AI</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                      <p className="text-sm text-text-primary">...</p>
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>
            </div>

            {/* Error strip */}
            {error && (
              <div className="px-4 py-2 text-xs text-red-600 bg-red-50 border-t border-red-200">
                {error}
              </div>
            )}

            {/* (Optional) BE tour load error strip */}
            {tourLoadError && (
              <div className="px-4 py-2 text-[10px] text-amber-700 bg-amber-50 border-t border-amber-200">
                Tour context chưa tải được: {tourLoadError}
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-border-primary bg-white rounded-b-lg">
              <div className="flex items-center gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn của bạn..."
                  rows={2}
                  className="flex-1 px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm resize-none whitespace-pre-wrap break-words"
                />

                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-brand-primary hover:bg-brand-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleChat}
        />
      )}
    </>
  );
};

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-brand-primary text-white p-3 rounded-lg shadow-sm max-w-xs">
          <p className="text-sm whitespace-pre-wrap break-all">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-xs text-white font-bold">AI</span>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h3: ({ node, ...props }) => (
              <p className="font-semibold text-sm mt-2" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <p className="font-medium text-sm mt-2" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-4 space-y-1" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-4 space-y-1" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-sm leading-relaxed" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>


      </div>
    </div>
  );
}

export default ChatSupport;
